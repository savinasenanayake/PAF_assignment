import axios from "axios";

const API_URL = "http://localhost:8080/api/resources";

export const getResources = () => axios.get(API_URL);

export const createResource = (data) => 
  axios.post(`${API_URL}?role=ADMIN`, data);

export const updateResource = (id, data) => 
  axios.put(`${API_URL}/${id}?role=ADMIN`, data);

export const deleteResource = (id) =>
  axios.delete(`${API_URL}/${id}?role=ADMIN`);

export const filterResources = (type, capacity, location) =>
  axios.get(
    `${API_URL}/filter?type=${type}&capacity=${capacity}&location=${location}`
  );