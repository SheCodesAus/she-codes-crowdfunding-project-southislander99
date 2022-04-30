import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProjectDetailTemplate from "./pages/ProjectDetailTemplate";
import ProjectListingPage from "./pages/ProjectListingPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Routes>
          <Route path="/project" element={<ProjectListingPage />} />
          <Route path="/project/:id" element={<ProjectDetailTemplate />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>

  );
}

export default App;