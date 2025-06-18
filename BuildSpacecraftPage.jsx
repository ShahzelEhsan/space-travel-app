import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  SpaceTravelApi  from "../services/SpaceTravelApi";

export default function BuildSpacecraftPage() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!capacity || isNaN(capacity) || capacity <= 0)
      errs.capacity = "Capacity must be a positive number";
    if (!description.trim()) errs.description = "Description is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await SpaceTravelApi.buildSpacecraft({
        name,
        capacity: Number(capacity),
        description,
      });
      navigate("/spacecrafts");
    } catch (err) {
      alert("Error building spacecraft.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Build New Spacecraft</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.name}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="capacity">Capacity:</label>
          <br />
          <input
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            disabled={loading}
          />
          {errors.capacity && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.capacity}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
          {errors.description && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.description}
            </div>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Building..." : "Build Spacecraft"}
        </button>
      </form>
    </div>
  );
}
