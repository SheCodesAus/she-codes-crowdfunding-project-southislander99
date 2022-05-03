import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import RegisterCta from "../components/RegisterCta/RegisterCta";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";

function ProjectListingPage() {
    const [projectList, setProjectList] = useState([]);
    //store the list of filtered categories from category filter component
    const [filterCategories, setFilterCategories] = useState([]);

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
            <div className="section-header">
                <h1>Latest Fad Projects!</h1>
            </div>
            <CategoryFilter setFilterCategories={setFilterCategories}/>
            <div id="project-list">
            {/* {* Filter projects by the selected categories.
            If no categories are selected (i.e. filterCategories = [] and hence lenght === 0) show all categories 
            OR if there is a category selected (length > 0) check the array of selected categories to see if project
            categorie fits the filter (i.e. is "included" in filtered categories array) *} */}
                {projectList.filter((project) => filterCategories.length===0 || filterCategories.includes(project.category)).map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;
                } )}
            </div>
            <RegisterCta />

        </main>
    );
}

export default ProjectListingPage;