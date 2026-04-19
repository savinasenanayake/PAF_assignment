import React, { useState } from "react";
import { FiSearch, FiRotateCcw } from "react-icons/fi";

function Filter({ onFilter }) {
  const [type, setType] = useState("LECTURE_HALL");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onFilter(type, capacity || 0, location);
  };

  const handleReset = () => {
    setType("LECTURE_HALL");
    setCapacity("");
    setLocation("");
    onFilter("LECTURE_HALL", 0, "");
  };

  return (
    <div className="card p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Filter Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Type */}
        <div className="form-group m-0">
          <label className="label-text">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input-field"
          >
            <option value="LECTURE_HALL">Lecture Hall</option>
            <option value="LAB">Laboratory</option>
            <option value="MEETING_ROOM">Meeting Room</option>
            <option value="EQUIPMENT">Equipment</option>
          </select>
        </div>

        {/* Capacity */}
        <div className="form-group m-0">
          <label className="label-text">Min Capacity</label>
          <input
            type="number"
            placeholder="0"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="input-field"
            min="0"
          />
        </div>

        {/* Location */}
        <div className="form-group m-0">
          <label className="label-text">Location</label>
          <input
            type="text"
            placeholder="Search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 items-end">
          <button
            onClick={handleSearch}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <FiSearch className="w-4 h-4" />
            <span>Search</span>
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary px-3 py-2 flex items-center justify-center"
            title="Reset filters"
          >
            <FiRotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;