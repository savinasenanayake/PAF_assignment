import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import eventsApi from '../api/eventsApi';
import '../styles/AllEventsPage.css';
import EventCard from '../components/EventCard';

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const navigate = useNavigate();

  const loadEvents = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const statusCounts = useMemo(() => {
    const counts = {
      ALL: events.length,
      OPEN: 0,
      FULL: 0,
      CLOSED: 0
    };

    events.forEach(event => {
      const eventStatus = (event.status || '').toLowerCase();
      if (eventStatus === 'open' || eventStatus === 'registration open') {
        counts.OPEN++;
      } else if (eventStatus === 'full' || eventStatus === 'registration full') {
        counts.FULL++;
      } else if (eventStatus === 'closed' || eventStatus === 'cancelled') {
        counts.CLOSED++;
      }
    });

    return counts;
  }, [events]);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(event => {
        const eventStatus = (event.status || '').toLowerCase();
        const filterStatus = statusFilter.toLowerCase();
        
        switch (filterStatus) {
          case 'open':
            return eventStatus === 'open' || eventStatus === 'registration open';
          case 'full':
            return eventStatus === 'full' || eventStatus === 'registration full';
          case 'closed':
            return eventStatus === 'closed' || eventStatus === 'cancelled';
          default:
            return false;
        }
      });
    }

    return filtered;
  }, [events, searchTerm, statusFilter]);

  if (loading) return <div className="all-events-page"><p>Loading...</p></div>;
  if (error) return <div className="all-events-page"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="all-events-page">
      <h1>All Events</h1>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="ALL">All Statuses ({statusCounts.ALL})</option>
          <option value="OPEN">Open ({statusCounts.OPEN})</option>
          <option value="FULL">Full ({statusCounts.FULL})</option>
          <option value="CLOSED">Closed ({statusCounts.CLOSED})</option>
        </select>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={() => navigate(`/events/${event.id}`)}
              onRegister={() => loadEvents()}
            />
          ))
        ) : (
          <div className="no-events">
            <p>No events found{statusFilter !== 'ALL' ? ` for status: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1).toLowerCase()}` : ''}.</p>
            {statusFilter !== 'ALL' && (
              <button 
                className="btn-reset-filter" 
                onClick={() => setStatusFilter('ALL')}
              >
                Show All Events
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEventsPage;
