import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [resources, setResources] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const [editingId, setEditingId] = useState(null);

  // 🔄 Load resources
  const loadResources = async () => {
    const res = await axios.get("http://localhost:8080/api/resources");
    setResources(res.data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  // ➕ Add / Update
  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8080/api/resources/${editingId}?role=${user.role}`,
          { name, type, capacity, location, status }
        );
        alert("Updated");
      } else {
        await axios.post(
          `http://localhost:8080/api/resources?role=${user.role}`,
          { name, type, capacity, location, status }
        );
        alert("Added");
      }

      // reset form
      setName("");
      setType("");
      setCapacity("");
      setLocation("");
      setStatus("ACTIVE");
      setEditingId(null);

      loadResources();

    } catch (err) {
      alert("Error");
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:8080/api/resources/${id}?role=${user.role}`
    );
    loadResources();
  };

  // ✏️ Edit
  const handleEdit = (r) => {
    setEditingId(r.id);
    setName(r.name);
    setType(r.type);
    setCapacity(r.capacity);
    setLocation(r.location);
    setStatus(r.status);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!user || user.role !== "ADMIN" ? (
        <h2>Access Denied</h2>
      ) : (
        <>
          <h2>Admin Panel</h2>

          {/* FORM */}
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <br /><br />

          <input placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
          <br /><br />

          <input placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          <br /><br />

          <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <br /><br />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
          </select>
          <br /><br />

          <button onClick={handleSave}>
            {editingId ? "Update Resource" : "Add Resource"}
          </button>

          <hr />

          {/* TABLE */}
          <h3>All Resources</h3>

          {resources.map((r) => (
            <div key={r.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
              <p><b>{r.name}</b></p>
              <p>Type: {r.type}</p>
              <p>Capacity: {r.capacity}</p>
              <p>Location: {r.location}</p>
              <p>Status: {r.status}</p>

              <button onClick={() => handleEdit(r)}>Edit</button>
              <button onClick={() => handleDelete(r.id)}>Delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AdminPanel;