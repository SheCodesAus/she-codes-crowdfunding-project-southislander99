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
      <div class="project-detail">
        <h2>{projectData.title}</h2>
        <h3><ProjectOwner owner={projectData.owner}/></h3>
        <h3>Created at: {projectData.date_created}</h3>
        <h3>{`Status: ${projectData.is_open}`}</h3>
      </div>


      <div class="project-pledge-list">
        <h3>Pledges:</h3>
        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li>
                <PledgeSupporter amount={pledgeData.amount} supporter={pledgeData.supporter} comment={pledgeData.comment} />
              </li>
            );
          })}
        </ul>
      </div>

    </main>
  );
}

export default ProjectDetailTemplate;