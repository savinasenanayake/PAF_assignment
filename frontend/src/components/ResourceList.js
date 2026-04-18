import React from "react";

function ResourceList({ resources, deleteResource }) {
  return (
    <div>
      <h2>Resources</h2>
      {resources.map((r) => (
        <div key={r.id}>
          <p>
            {r.name} | {r.type} | {r.capacity} | {r.location} | {r.status}
          </p>
          <button onClick={() => deleteResource(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ResourceList;