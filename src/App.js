import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProjectDetailTemplate from "./pages/ProjectDetailTemplate";
import ProjectListingPage from "./pages/ProjectListingPage";
import LoginPage from "./pages/LoginPage";
import PledgePage from "./pages/PledgePage";
import ProfilePage from "./pages/ProfilePage";
import CreateProjectPage from "./pages/CreateProjectPage";
import RegisterPage from "./pages/RegisterPage";
import EditProjectPage from "./pages/EditProjectPage";


function App() {
  return (
    <Router>
      <Navbar />
      <div>
        

        <Routes>
          <Route path="/users/:id" element={<ProfilePage />} />
          <Route path="/pledges/:id" element={<PledgePage />} />
          <Route path="/project" element={<ProjectListingPage />} />
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/edit-project/:id" element={<EditProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetailTemplate />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>

  );
}

export default App;