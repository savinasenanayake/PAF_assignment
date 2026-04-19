import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import {
  getResources,
  deleteResource,
  filterResources,
  updateResource
} from "./services/ResourceService";
import ResourceForm from "./components/ResourceForm";
import ResourceList from "./components/ResourceList";
import Filter from "./components/Filter";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Login from "./Login";
import AdminPanel from "./AdminPanel";


function Dashboard() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getResources();
      setResources(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    await deleteResource(id);
    loadData();
  };

  const handleFilter = async (type, capacity, location) => {
    try {
      setLoading(true);
      const res = await filterResources(type, capacity, location);
      setResources(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
  };

  const handleCancelEdit = () => {
    setEditingResource(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Smart Campus Resource Manager</h1>
            <p className="text-primary-100 mt-1">Manage resources efficiently</p>
          </div>
          <button
            onClick={toggleTheme}
            className="btn-icon bg-white bg-opacity-20 hover:bg-opacity-30"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <FiSun className="w-6 h-6" />
            ) : (
              <FiMoon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <ResourceForm 
                refresh={loadData} 
                editingResource={editingResource}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </aside>

          {/* List and Filter Section */}
          <section className="lg:col-span-2">
            <Filter onFilter={handleFilter} />
            <ResourceList 
              resources={resources} 
              deleteResource={handleDelete} 
              editResource={handleEdit}
              loading={loading} 
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 Smart Campus Resource Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;