import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectOwner from "../components/ProjectOwner/ProjectOwner";
import PledgeSupporter from "../components/PledgeSupporter/PledgeSupporter";

function ProjectDetailTemplate() {
  // State
  const [projectData, setProjectData] = useState();

  // Hooks
  const { id } = useParams();

  // Actions and Helpers
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, [id]);

  // Loading State
  if (!projectData) {
    return <h3>Loading project....</h3>;
  }

  // Normal State
  return (
    <main>
      <div class="project-header">
        <h2>{projectData.title}</h2>
        <h3>Influcencer: <ProjectOwner owner={projectData.owner}/></h3>
      </div>

      <div class="project-detail">
        <img src={projectData.image} />
          <h3>Project Details</h3>
          <p class="project-description">{projectData.description}</p>
          <ul>
            <li>Project Starting: {projectData.date_start}</li>
            <li>Project Ending: {projectData.date_ending}</li>
            <li>{`Status: ${projectData.is_open}`}</li>
          </ul>
          <h4>Goal: {projectData.goal}</h4>
          <h4>Amount raised: Add in total pledge amount here</h4>
      </div>


      <div class="project-pledge-list">
        <h3>Pledges</h3>
        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li>
                <PledgeSupporter amount={pledgeData.amount} supporter={pledgeData.supporter} comment={pledgeData.comment} />
              </li>
            );
          })}
        </ul>
        <a class="button" href="/">Pledge to this project</a>
      </div>

      <div class="project-comments">
        <h3>Comments</h3>
        <ul>
          {projectData.comments.map((commentData, key) => {
            return (
              <li>
                {commentData.body} by {commentData.author}
              </li>
            );
          })}
        </ul>
        <a class="button" href="/">Comment on this project</a>
      </div>

    </main>
  );
}

export default ProjectDetailTemplate;