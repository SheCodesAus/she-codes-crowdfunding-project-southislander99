import React, { useState } from "react";

// Imports
import { useNavigate,useParams,Link } from "react-router-dom";

function ProjectForm(projectData) {
  // State
  const token = window.localStorage.getItem("token")
  const [project, postProject] = useState(
    projectData.map
  );

  // // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Actions and Helpers
  const handleChange = (event) => {
    const { id, value } = event.target;
    postPledge((PledgeData) => ({
      ...PledgeData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = window.localStorage.getItem("token")
    console.log("handleSubmit", pledge, token)
    
    // Is user logged in and have they put something in all fields?
    if (token && pledge.amount && pledge.comment) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}pledges/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
              amount: parseInt(pledge.amount), 
              comment: pledge.comment, 
              anonymous: true, 
              project_id: parseInt(id)
            }),
          }
        );
        const data = await response.json();
        console.log(data)
        navigate(`/project/${id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

    if (!token) {
      return (
        <Link to="/login">Please login to pledge to this amazing project</Link>
      );
    }


    return (
        <form>
          <div>
            <label htmlFor="amount">Enter Amount:</label>
            <input
              type="text"
              id="amount"
              placeholder="Enter amount"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="comment">Leave a Comment:</label>
            <input
              type="text"
              id="comment"
              placeholder="Comment"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Post Pledge
          </button>
        </form>
      );
}

export default ProjectForm;