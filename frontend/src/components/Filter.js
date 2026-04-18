import React, { useState } from "react";

function Filter({ onFilter }) {
  const [type, setType] = useState("LECTURE_HALL");
  const [capacity, setCapacity] = useState(0);
  const [location, setLocation] = useState("");

  return (
    <div>
      <h2>Filter</h2>

      <select onChange={(e) => setType(e.target.value)}>
        <option>LECTURE_HALL</option>
        <option>LAB</option>
        <option>MEETING_ROOM</option>
        <option>EQUIPMENT</option>
      </select>

      <input
        type="number"
        placeholder="Capacity"
        onChange={(e) => setCapacity(e.target.value)}
      />

      <input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={() => onFilter(type, capacity, location)}>
        Search
      </button>
    </div>
  );
}

export default Filter;