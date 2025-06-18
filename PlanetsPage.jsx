import React, { useEffect, useState } from "react";
import  SpaceTravelApi  from "../services/SpaceTravelApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PlanetsPage() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [plRes, scRes] = await Promise.all([
          SpaceTravelApi.getPlanets(),
          SpaceTravelApi.getSpacecrafts(),
        ]);
        if (!plRes.isError) setPlanets(plRes.data);
        if (!scRes.isError) setSpacecrafts(scRes.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const getSpacecraftsByPlanetId = (planetId) => {
    return spacecrafts.filter((sc) => sc.currentLocation === planetId);
  };

  return (
    <div>
      <h1>Planets</h1>
      {planets.length === 0 && <p>No planets found.</p>}
      {planets.map((planet) => (
        <div
          key={planet.id}
          style={{
            backgroundColor: "#222",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
          }}
        >
          <h2>{planet.name}</h2>
          <p>Current Population: {planet.currentPopulation}</p>
          <h3>Spacecrafts Stationed:</h3>
          <ul>
            {getSpacecraftsByPlanetId(planet.id).length === 0 && (
              <li>No spacecrafts stationed here.</li>
            )}
            {getSpacecraftsByPlanetId(planet.id).map((sc) => (
              <li key={sc.id}>{sc.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
