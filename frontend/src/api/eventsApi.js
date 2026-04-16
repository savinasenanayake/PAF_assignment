const normalizeApiBaseUrl = (apiUrl) => {
  const value = (apiUrl || '').trim();
  if (!value) {
    return '/api';
  }

  const withoutTrailingSlash = value.replace(/\/+$/, '');
  if (withoutTrailingSlash.endsWith('/api')) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}/api`;
};

const API_BASE_URL = normalizeApiBaseUrl(process.env.REACT_APP_API_URL);

const buildApiError = async (response, fallbackMessage) => {
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  const message = payload?.message || fallbackMessage;
  const apiError = new Error(message);
  apiError.status = response.status;
  apiError.details = payload;
  throw apiError;
};

const eventsApi = {
  getAllEvents: async () => {
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/events`);
    } catch (error) {
      throw new Error('Cannot connect to backend. Ensure the API server is running on port 8080.');
    }
    if (!response.ok) await buildApiError(response, 'Failed to fetch events');
    return response.json();
  },

  getMyEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/events/my`);
    if (!response.ok) await buildApiError(response, 'Failed to fetch my events');
    return response.json();
  },

  getEventById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) await buildApiError(response, 'Failed to fetch event');
    return response.json();
  },

  createEvent: async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) await buildApiError(response, 'Failed to create event');
    return response.json();
  },

  updateEvent: async (eventId, eventData) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) await buildApiError(response, 'Failed to update event');
    return response.json();
  },

  deleteEvent: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) await buildApiError(response, 'Failed to delete event');
  },

  registerEvent: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) await buildApiError(response, 'Failed to register for event');
    return response.json();
  },

  cancelRegistration: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) await buildApiError(response, 'Failed to cancel registration');
    return response.json();
  },
};

export default eventsApi;
