// Import necessary dependencies
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Stocks from "./pages/Stocks";
import Charts from "./pages/Charts";
import Home from "./pages/Home";
import "./App.css";

const activeStyle = {
  fontWeight: "bold",
  color: "white",
};

export default function App() {
  return (
    // Router with links to different pages
    <Router>
      <div>
        <ul className="nav-style">
          <li className="left-link">
            <NavLink
              to="/"
              className="link-style"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Home
            </NavLink>
          </li>
          <li className="logo-link">
            <img src="/logo.png" alt="Logo" className="logo" />
          </li>
          <li className="right-link">
            <NavLink
              to="/stocks"
              className="link-style"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Stocks
            </NavLink>
            <span className="separator">|</span>
            <NavLink
              to="/charts"
              className="link-style"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Charts
            </NavLink>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </div>
    </Router>
  );
}
