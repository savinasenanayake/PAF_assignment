import React, { useState, useEffect } from 'react';
import eventsApi from '../api/eventsApi';
import '../styles/MyEventsPage.css';
import EventCard from '../components/EventCard';
// My events page to view registered and waitlisted events with tabbed navigation
const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('registered');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getMyEvents();
      setEvents(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
// Filter events into registered and waitlisted categories for tabbed display
  const registeredEvents = events.filter(e => e.userState === 'REGISTERED');
  const waitlistedEvents = events.filter(e => e.userState === 'WAITLISTED');

  if (loading) return <div className="my-events-page"><p>Loading...</p></div>;
  if (error) return <div className="my-events-page"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="my-events-page">
      <h1>My Events</h1>
      
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'registered' ? 'active' : ''}`}
          onClick={() => setActiveTab('registered')}
        >
          Registered ({registeredEvents.length})
        </button>
        <button
          className={`tab ${activeTab === 'waitlisted' ? 'active' : ''}`}
          onClick={() => setActiveTab('waitlisted')}
        >
          Waitlisted ({waitlistedEvents.length})
        </button>
      </div>

      <div className="events-grid">
        {activeTab === 'registered' ? (
          registeredEvents.length > 0 ? (
            registeredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={() => loadEvents()}
              />
            ))
          ) : (
            <p>No registered events.</p>
          )
        ) : (
          waitlistedEvents.length > 0 ? (
            waitlistedEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={() => loadEvents()}
              />
            ))
          ) : (
            <p>No waitlisted events.</p>
          )
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
