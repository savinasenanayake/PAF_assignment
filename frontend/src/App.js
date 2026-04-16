import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AllEventsPage from './pages/AllEventsPage';
import MyEventsPage from './pages/MyEventsPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/create-event" element={<CreateEventPage />} />
      <Route path="/admin/edit-event/:id" element={<CreateEventPage />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<AllEventsPage />} />
              <Route path="/my-events" element={<MyEventsPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
