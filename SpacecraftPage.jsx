import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import  SpaceTravelApi  from "../services/SpaceTravelApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SpacecraftPage() {
  const { id } = useParams();
  const [spacecraft, setSpacecraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [planetsMap, setPlanetsMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [scRes, plRes] = await Promise.all([
          SpaceTravelApi.getSpacecraftById({ id }),
          SpaceTravelApi.getPlanets(),
        ]);
        if (!scRes.isError) setSpacecraft(scRes.data);
        if (!plRes.isError) {
          const map = {};
          plRes.data.forEach((p) => {
            map[p.id] = p.name;
          });
          setPlanetsMap(map);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!spacecraft) return <p>Spacecraft not found.</p>;

  return (
    <div>
      <h1>{spacecraft.name}</h1>
      <p>
        <strong>Capacity:</strong> {spacecraft.capacity}
      </p>
      <p>
        <strong>Description:</strong> {spacecraft.description}
      </p>
      <p>
        <strong>Current Location:</strong>{" "}
        {planetsMap[spacecraft.currentLocation] || "Unknown"}
      </p>
      <Link to="/spacecrafts" style={{ marginRight: 10 }}>
        Back to Spacecrafts
      </Link>
    </div>
  );
}
