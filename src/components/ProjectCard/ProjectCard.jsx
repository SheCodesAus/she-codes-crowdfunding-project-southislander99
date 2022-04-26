import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({projectData}) {
    return (
        <div className="project-card">
            <Link to={`/project/${projectData.id}`}>
                <img src={projectData.image} alt="the project"/>
                <h3>{projectData.title}</h3>
            </Link>
        </div>
    );
}

export default ProjectCard;