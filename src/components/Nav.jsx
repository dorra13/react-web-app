// src/components/Nav.jsx

import React from "react";
import "../styles.css"; // Import styles

const Nav = () => {
  return (
    <nav className="nav-bar">
      <a href="#home">
        <img className="nav-icon" src="/images/Home-icon.png" alt="Home" />
        Home
      </a>
      <a href="#workouts">
        <img
          className="nav-icon"
          src="/images/workout-icon.png"
          alt="Workouts"
        />
        Workouts
      </a>
      <a href="#food-plan">
        <img
          className="nav-icon"
          src="/images/food-plan-icon.png"
          alt="Food Plan"
        />
        Food Plan
      </a>
      <a href="#profile">
        <img
          className="nav-icon"
          src="/images/profile-icon.png"
          alt="Profile"
        />
        Profile
      </a>
    </nav>
  );
};

export default Nav; // Export the Nav component
