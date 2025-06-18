import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SpacecraftsPage from "./pages/SpacecraftsPage";
import SpacecraftPage from "./pages/SpacecraftPage";
import BuildSpacecraftPage from "./pages/BuildSpacecraftPage";
import PlanetsPage from "./pages/PlanetsPage";

import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <h1 className={styles.app__headerTitle}>🌌 Space Travel Command</h1>
        <nav className={styles.app__nav}>
          <Link to="/">Home</Link>
          <Link to="/spacecrafts">Spacecrafts</Link>
          <Link to="/planets">Planets</Link>
          <Link to="/build">Build</Link>
        </nav>
      </header>

      <main className={styles["app__header-title"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spacecrafts" element={<SpacecraftsPage />} />
          <Route path="/spacecrafts/:id" element={<SpacecraftPage />} />
          <Route path="/build" element={<BuildSpacecraftPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
