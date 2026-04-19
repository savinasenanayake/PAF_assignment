import React, { useState, useEffect } from "react";
import { FiPlus, FiCheckCircle, FiX } from "react-icons/fi";
import { createResource, updateResource } from "../services/ResourceService";

function ResourceForm({ refresh, editingResource, onCancelEdit }) {
  const [form, setForm] = useState({
    name: "",
    type: "LECTURE_HALL",
    capacity: 0,
    location: "",
    status: "ACTIVE",
    availabilityWindows: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingResource) {
      setForm({
        name: editingResource.name,
        type: editingResource.type,
        capacity: editingResource.capacity,
        location: editingResource.location,
        status: editingResource.status,
        availabilityWindows: ""
      });
    } else {
      // Reset form when not editing
      setForm({
        name: "",
        type: "LECTURE_HALL",
        capacity: 0,
        location: "",
        status: "ACTIVE",
        availabilityWindows: ""
      });
    }
  }, [editingResource]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.capacity) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const data = {
        name: form.name,
        type: form.type,
        capacity: parseInt(form.capacity),
        location: form.location,
        status: form.status,
        availabilityWindows: form.availabilityWindows
          ? form.availabilityWindows.split(",").map(w => w.trim())
          : []
      };

      if (editingResource) {
        // Update existing resource
        await updateResource(editingResource.id, data);
        setSuccess(true);
        if (onCancelEdit) onCancelEdit();
      } else {
        // Create new resource
        await createResource(data);
        setSuccess(true);
        setForm({
          name: "",
          type: "LECTURE_HALL",
          capacity: 0,
          location: "",
          status: "ACTIVE",
          availabilityWindows: ""
        });
      }
      
      setTimeout(() => setSuccess(false), 3000);
      refresh();
    } catch (error) {
      console.error("Failed to save resource:", error);
      alert("Error saving resource");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: "",
      type: "LECTURE_HALL",
      capacity: 0,
      location: "",
      status: "ACTIVE",
      availabilityWindows: ""
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {editingResource ? "Edit Resource" : "Add New Resource"}
        </h2>
        {editingResource && (
          <button
            onClick={handleCancel}
            className="btn-icon text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            title="Cancel editing"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300">
          <FiCheckCircle className="w-5 h-5" />
          <span className="font-medium">
            {editingResource ? "Resource updated successfully!" : "Resource created successfully!"}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="form-group">
          <label className="label-text">Resource Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Main Lecture Hall"
            className="input-field"
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="label-text">Location *</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., Building A, Room 101"
            className="input-field"
            required
          />
        </div>

        {/* Capacity */}
        <div className="form-group">
          <label className="label-text">Capacity *</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="0"
            className="input-field"
            min="1"
            required
          />
        </div>

        {/* Type */}
        <div className="form-group">
          <label className="label-text">Resource Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="input-field"
          >
            <option value="LECTURE_HALL">Lecture Hall</option>
            <option value="LAB">Laboratory</option>
            <option value="MEETING_ROOM">Meeting Room</option>
            <option value="EQUIPMENT">Equipment</option>
          </select>
        </div>

        {/* Status */}
        <div className="form-group">
          <label className="label-text">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {/* Availability Windows */}
        <div className="form-group">
          <label className="label-text">Availability Windows</label>
          <input
            type="text"
            name="availabilityWindows"
            value={form.availabilityWindows}
            onChange={handleChange}
            placeholder="MONDAY 8-12, TUESDAY 10-4"
            className="input-field"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Format: DAY START-END, separated by commas
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 mt-6"
        >
          <FiPlus className="w-5 h-5" />
          {loading ? (editingResource ? "Updating..." : "Adding...") : (editingResource ? "Update Resource" : "Add Resource")}
        </button>
      </form>
    </div>
  );
}

export default ResourceForm;