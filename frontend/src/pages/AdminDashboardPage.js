import React, { useState, useEffect } from 'react';
import eventsApi from '../api/eventsApi';
import '../styles/AdminDashboardPage.css';
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';
// Admin dashboard page to view all events, stats, and manage events
const AdminDashboardPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadAllEvents();
  }, []);

  const loadAllEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getAllEvents();
      setEvents(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const shouldDelete = window.confirm('Delete this event?');
    if (!shouldDelete) {
      return;
    }

    try {
      await eventsApi.deleteEvent(eventId);
      await loadAllEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const totalEvents = events.length;
  
  // Calculate events by status with comprehensive status handling
  const openEvents = events.filter(e => {
    const status = (e.status || '').toUpperCase();
    return status === 'OPEN' || status === 'REGISTRATION OPEN';
  }).length;
  
  const fullEvents = events.filter(e => {
    const status = (e.status || '').toUpperCase();
    return status === 'FULL' || status === 'REGISTRATION FULL' || (e.capacity && e.registered && e.registered >= e.capacity);
  }).length;
  
  const closedEvents = events.filter(e => {
    const status = (e.status || '').toUpperCase();
    const eventDate = new Date(e.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    return status === 'CLOSED' || status === 'CANCELLED' || eventDate < today;
  }).length;

  if (loading) return <div className="admin-page"><p>Loading...</p></div>;
  if (error) return <div className="admin-page"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="admin-shell">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item" onClick={() => navigate('/admin/create-event')}>Create Event</button>
        </nav>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1>Event Management Dashboard</h1>
          <p>Review all added events and open details from one place</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-card-total">
            <div className="stat-value">{totalEvents}</div>
            <div className="stat-label">Total Events</div>
          </div>
          <div className="stat-card stat-card-open">
            <div className="stat-value">{openEvents}</div>
            <div className="stat-label">Open Events</div>
          </div>
          <div className="stat-card stat-card-full">
            <div className="stat-value">{fullEvents}</div>
            <div className="stat-label">Full Events</div>
          </div>
          <div className="stat-card stat-card-closed">
            <div className="stat-value">{closedEvents}</div>
            <div className="stat-label">Closed Events</div>
          </div>
        </div>

        <div className="events-panel">
          <h2>All Added Events</h2>
          <div className="events-grid">
            {events.length > 0 ? (
              events.map(event => (
                <div key={event.id} className="event-item">
                  <EventCard
                    event={event}
                    onViewDetails={() => navigate(`/events/${event.id}`)}
                    showRegisterButton={false}
                    onEdit={() => navigate(`/admin/edit-event/${event.id}`)}
                    onDelete={() => handleDeleteEvent(event.id)}
                  />
                </div>
              ))
            ) : (
              <p>No events yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
