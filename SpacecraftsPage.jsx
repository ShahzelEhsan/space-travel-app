import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpaceTravelApi  from "../services/SpaceTravelApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSpacecrafts = async () => {
    setLoading(true);
    try {
      const res = await SpaceTravelApi.getSpacecrafts();
      if (!res.isError) setSpacecrafts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to decommission this spacecraft?"
      )
    ) {
      await SpaceTravelApi.destroySpacecraftById({ id });
      fetchSpacecrafts();
    }
  };

  useEffect(() => {
    fetchSpacecrafts();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!spacecrafts.length)
    return (
      <div>
        <p>No spacecrafts found.</p>
        <Link to="/build">Build the first spacecraft</Link>
      </div>
    );

  return (
    <div>
      <h1>Spacecrafts</h1>
      <Link to="/build" style={{ marginBottom: "1rem", display: "inline-block" }}>
        Build New Spacecraft
      </Link>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {spacecrafts.map((sc) => (
          <li
            key={sc.id}
            style={{
              backgroundColor: "#222",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >
            <h2>
              <Link to={`/spacecrafts/${sc.id}`}>{sc.name}</Link>
            </h2>
            <p>Capacity: {sc.capacity}</p>
            <p>Description: {sc.description}</p>
            <p>Current Location: Planet ID {sc.currentLocation}</p>
            <button
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
              }}
              onClick={() => handleDelete(sc.id)}
            >
              Decommission
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
