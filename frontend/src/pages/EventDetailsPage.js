import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventsApi from '../api/eventsApi';
import '../styles/EventDetailsPage.css';
import { getEventImage, getSafeFallbackImage } from '../utils/eventImage';
// Event details page to view event information and register/cancel registration
const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEvent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getEventById(id);
      setEvent(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  const handleRegister = async () => {
    try {
      await eventsApi.registerEvent(id);
      loadEvent();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = async () => {
    try {
      await eventsApi.cancelRegistration(id);
      loadEvent();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="details-page"><p>Loading...</p></div>;
  if (error) return <div className="details-page"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!event) return <div className="details-page"><p>Event not found</p></div>;

  const isRegistered = event.userState === 'REGISTERED';
  const imageUrl = getEventImage(event);

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      
      <div className="details-container">
        <img
          src={imageUrl}
          alt={event.title}
          className="details-image"
          onError={(e) => {
            const fallback = getSafeFallbackImage(event);
            if (e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
        />
        
        <div className="details-content">
          <h1>{event.title}</h1>
          
          <div className="event-meta">
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Campus:</strong> {event.campus}</p>
            <p><strong>Capacity:</strong> {event.registered} / {event.capacity}</p>
            <p><strong>Status:</strong> <span className={`status ${event.status}`}>{event.status}</span></p>
            {event.category && <p><strong>Category:</strong> {event.category}</p>}
            {event.organizer && <p><strong>Organizer:</strong> {event.organizer}</p>}
          </div>

          <div className="details-description">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>

          <div className="action-buttons">
            {isRegistered ? (
              <button className="btn btn-cancel" onClick={handleCancel}>
                Cancel Registration
              </button>
            ) : (
              <button className="btn btn-register" onClick={handleRegister}>
                Register for Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
