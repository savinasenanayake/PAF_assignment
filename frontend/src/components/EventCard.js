import React from 'react';
import '../styles/EventCard.css';
import { getEventImage, getSafeFallbackImage } from '../utils/eventImage';
//update compont
const EventCard = ({ event, onViewDetails, onRegister, showRegisterButton = true, onEdit, onDelete }) => {
  const isRegistered = event.userState === 'REGISTERED';
  const isFull = event.status === 'FULL';
  const imageUrl = getEventImage(event);

  const getStatusBadgeClass = (status) => {
    const cleanStatus = (status || '').toLowerCase().replace('registration ', '');
    switch (cleanStatus) {
      case 'open':
        return 'status-open';
      case 'full':
        return 'status-full';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-default';
    }
  };

  const getCleanStatus = (status) => {
    const cleanStatus = (status || '').replace('Registration ', '');
    return cleanStatus;
  };

  const handleRegisteredClick = () => {
    // When user clicks REGISTERED button, navigate to event details
    if (onViewDetails) {
      onViewDetails();
    }
  };

  return (
    <div className="event-card">
      <div className="card-image">
        <img
          src={imageUrl}
          alt={event.title}
          onError={(e) => {
            const fallback = getSafeFallbackImage(event);
            if (e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
        />
        <span className={`status-badge ${getStatusBadgeClass(event.status)}`}>{getCleanStatus(event.status)}</span>
      </div>
      
      <div className="card-content">
        <h3>{event.title}</h3>
        
        <p className="card-description">{event.description}</p>
        
        <div className="card-meta">
          <p><strong>📅</strong> {event.date}</p>
          <p><strong>⏰</strong> {event.startTime}</p>
          <p><strong>📍</strong> {event.location}</p>
          <p><strong>👥</strong> {event.registered}/{event.capacity}</p>
        </div>

        <div className="card-actions">
          {onViewDetails && (
            <button className="btn-view" onClick={onViewDetails}>
              View Details
            </button>
          )}

          {onEdit && (
            <button className="btn-edit" onClick={onEdit}>
              Edit
            </button>
          )}

          {onDelete && (
            <button className="btn-delete" onClick={onDelete}>
              Delete
            </button>
          )}
          
          {showRegisterButton && (
            <button
              className={`btn-register ${isRegistered ? 'registered' : ''} ${isFull ? 'disabled' : ''}`}
              disabled={isFull && !isRegistered}
              onClick={isRegistered ? handleRegisteredClick : onRegister}
            >
              {isRegistered ? '✓ Registered' : isFull ? 'Event Full' : 'Register'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
