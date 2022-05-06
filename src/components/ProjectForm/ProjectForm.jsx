import React, { useState } from "react";
import { useNavigate,useParams,Link } from "react-router-dom";

function ProjectForm(projectData) {
  // State
  const token = window.localStorage.getItem("token")
  const [project, postProject] = useState(
    projectData.map
  );
  const formFields = [
      {
        id: "title",
        label: "Title",
        placeholder: "Enter project title",
        type: "text",
      },
      {
        id: "description",
        label: "Description",
        placeholder: "Enter project description",
        type: "text",
      },
      {
        id: "goal",
        label: "Goal",
        placeholder: "Enter project goal ammount",
        type: "text",
      },
      {
        id: "image",
        label: "Image",
        placeholder: "Add an image url",
        type: "url",
      },
      {
        id: "is_open",
        label: "Project Status",
        placeholder: "Set project status",
        type: "radio",
      },
      {
        id: "date_start",
        label: "Image",
        placeholder: "Set start date of project",
        type: "date",
      },
      {
        id: "date_ending",
        label: "Image",
        placeholder: "Set end date of project",
        type: "date",
      },
      {
        id: "category",
        label: "Category",
        placeholder: "Select project category",
        type: "text",
      },
      
  ]

  // // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Actions and Helpers
  const handleChange = (event) => {
    const { id, value } = event.target;
    postProject((ProjectData) => ({
      ...ProjectData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = window.localStorage.getItem("token")
    console.log("handleSubmit", project, token)
    
    // Is user logged in and have they put something in all fields?
    if (token && project.title && project.goal) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}projects/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
              title: project.title, 
              description: project.description, 
              goal: parseInt(project.goal), 
              image: project.image,
              is_open: true,
              date_start: project.date_start,
              date_ending: project.date_ending,
              category: project.category,
            }),
          }
        );
    
        const data = await response.json();
        console.log(data)
        navigate(`/project`);
      } catch (err) {
        console.log(err);
      }
    }
  };

    if (!token) {
      return (
        <Link to="/login">Please login to create a project</Link>
      );
    }

    return(
        <form>
            {formFields.map((field, key) => {
                return(
                    <div key={`${key}-${field.id}`}>

                        <label htmlFor={field.id}>
                            {field.label}
                        </label>

                        <input
                            type={field.type}
                            id={field.id}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    </div>
                );
            })}
            <button type="submit" onClick={handleSubmit}>
                Create a Project
            </button>
        </form>

    )



}

export default ProjectForm;