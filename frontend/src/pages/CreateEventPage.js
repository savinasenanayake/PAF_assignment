import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../api/eventsApi';
import '../styles/CreateEventPage.css';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    campus: '',
    capacity: '',
    category: '',
    organizer: '',
    imageUrl: '',
    status: 'Open', // Default to 'Open' for new events
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadEventForEdit = async () => {
      try {
        setLoading(true);
        const data = await eventsApi.getEventById(id);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
          startTime: data.startTime || '',
          endTime: data.endTime || '',
          location: data.location || '',
          campus: data.campus || '',
          capacity: data.capacity || '',
          category: data.category || '',
          organizer: data.organizer || '',
          imageUrl: data.imageUrl || '',
          status: data.status || 'Open', // Use existing status or default to 'Open'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEventForEdit();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    if (!formData.startTime) {
      errors.startTime = 'Start time is required';
    }
    if (!formData.endTime) {
      errors.endTime = 'End time is required';
    }
    if (formData.startTime && formData.endTime && formData.endTime <= formData.startTime) {
      errors.endTime = 'End time must be after start time';
    }
    if (!formData.location || !formData.location.trim()) {
      errors.location = 'Location is required';
    }
    if (!formData.campus || !formData.campus.trim()) {
      errors.campus = 'Campus is required';
    }
    const capacityValue = Number(formData.capacity);
    if (!formData.capacity || Number.isNaN(capacityValue) || capacityValue < 1) {
      errors.capacity = 'Capacity must be at least 1';
    }
    if (!formData.category || !formData.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!formData.organizer || !formData.organizer.trim()) {
      errors.organizer = 'Organizer is required';
    }
    if (!formData.status || !formData.status.trim()) {
      errors.status = 'Status is required';
    }
    
    // Optional: Validate image URL format if provided
    if (formData.imageUrl && formData.imageUrl.trim()) {
      const urlPattern = /^https?:\/\/.+/i;
      if (!urlPattern.test(formData.imageUrl.trim())) {
        errors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setFieldErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setError('Please fix validation errors');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const eventData = {
        ...formData,
        capacity: parseInt(formData.capacity),
      };

      if (isEditMode) {
        await eventsApi.updateEvent(id, eventData);
      } else {
        await eventsApi.createEvent(eventData);
      }
      navigate('/admin');
    } catch (err) {
      const backendFieldErrors = err?.details?.errors;
      if (backendFieldErrors && typeof backendFieldErrors === 'object') {
        setFieldErrors(backendFieldErrors);
        setError('Validation failed. Please check highlighted fields.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <button className="back-btn" onClick={() => navigate('/admin')}>← Back</button>
      
      <div className="form-container">
        <h1>{isEditMode ? 'Edit Event' : 'Create New Event'}</h1>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Event Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
              />
              {fieldErrors.title && <p className="field-error">{fieldErrors.title}</p>}
            </div>
            
            <div className="form-group">
              <label>Organizer</label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="Event organizer"
              />
              {fieldErrors.organizer && <p className="field-error">{fieldErrors.organizer}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event description"
              rows="4"
            />
            {fieldErrors.description && <p className="field-error">{fieldErrors.description}</p>}
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL (https://...)"
            />
            {fieldErrors.imageUrl && <p className="field-error">{fieldErrors.imageUrl}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              {fieldErrors.date && <p className="field-error">{fieldErrors.date}</p>}
            </div>
            
            <div className="form-group">
              <label>Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
              {fieldErrors.startTime && <p className="field-error">{fieldErrors.startTime}</p>}
            </div>
            
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
              {fieldErrors.endTime && <p className="field-error">{fieldErrors.endTime}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location"
              />
              {fieldErrors.location && <p className="field-error">{fieldErrors.location}</p>}
            </div>
            
            <div className="form-group">
              <label>Campus</label>
              <input
                type="text"
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                placeholder="Campus"
              />
              {fieldErrors.campus && <p className="field-error">{fieldErrors.campus}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Capacity *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Event capacity"
                required
              />
              {fieldErrors.capacity && <p className="field-error">{fieldErrors.capacity}</p>}
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Event category"
              />
              {fieldErrors.category && <p className="field-error">{fieldErrors.category}</p>}
            </div>
            
            <div className="form-group">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select Status</option>
                <option value="Open" style={{ color: '#22c55e' }}>Open</option>
                <option value="Full" style={{ color: '#f97316' }}>Full</option>
                <option value="Closed" style={{ color: '#ef4444' }}>Closed</option>
              </select>
              {fieldErrors.status && <p className="field-error">{fieldErrors.status}</p>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Event')}
            </button>
            <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
