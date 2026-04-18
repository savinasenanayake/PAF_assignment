import React, { useEffect, useState } from "react";
import {
  getResources,
  deleteResource,
  filterResources
} from "./services/ResourceService";
import ResourceForm from "./components/ResourceForm";
import ResourceList from "./components/ResourceList";
import Filter from "./components/Filter";

function App() {
  const [resources, setResources] = useState([]);

  const loadData = async () => {
    const res = await getResources();
    setResources(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    await deleteResource(id);
    loadData();
  };

  const handleFilter = async (type, capacity, location) => {
    const res = await filterResources(type, capacity, location);
    setResources(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Campus Resource Manager</h1>

      <ResourceForm refresh={loadData} />
      <Filter onFilter={handleFilter} />
      <ResourceList resources={resources} deleteResource={handleDelete} />
    </div>
  );
}

export default App;