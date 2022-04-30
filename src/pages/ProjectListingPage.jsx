import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import RegisterCta from "../components/RegisterCta/RegisterCta";
import ProjectFilters from "../components/ProjectFilters/ProjectFilters";

function ProjectListingPage() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
        setProjectList(data)
        });        ;
    }, []);

    return (
        <main>
            <ProjectFilters />
            <div class="section-header">
                <h2>Latest Fad Projects!</h2>
            </div>
            <div id="project-list">
                {projectList.map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;
                } )}
            </div>
            <RegisterCta />

        </main>
    );
}

export default ProjectListingPage;