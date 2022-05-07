import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


//Components
import EditProjectForm from "../components/EditProjectForm/EditProjectForm";

function EditProjectPage() {

    const [projectData, setProjectData] = useState();

    const {id} = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((project) => {
            setProjectData(project);
        });
    }, []);
    
    if (!projectData) {
        return <h3>Loading project....</h3>;
        }


    return <EditProjectForm projectData={projectData}/>;
}

export default EditProjectPage;