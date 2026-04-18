import React, { useState } from "react";
import { createResource } from "../services/ResourceService";

function ResourceForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    type: "LECTURE_HALL",
    capacity: 0,
    location: "",
    status: "ACTIVE",
    availabilityWindows: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      capacity: parseInt(form.capacity),
      availabilityWindows: form.availabilityWindows.split(",")
    };

    await createResource(data);
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Resource</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="capacity" type="number" onChange={handleChange} />

      <select name="type" onChange={handleChange}>
        <option>LECTURE_HALL</option>
        <option>LAB</option>
        <option>MEETING_ROOM</option>
        <option>EQUIPMENT</option>
      </select>

      <select name="status" onChange={handleChange}>
        <option>ACTIVE</option>
        <option>OUT_OF_SERVICE</option>
      </select>

      <input
        name="availabilityWindows"
        placeholder="MONDAY 8-12,TUESDAY 10-4"
        onChange={handleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default ResourceForm;