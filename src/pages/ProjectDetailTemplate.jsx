import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProjectOwner from "../components/ProjectOwner/ProjectOwner";
import PledgeSupporter from "../components/PledgeSupporter/PledgeSupporter";
import PledgeProgress from "../components/PledgeProgress/PledgeProgress";
import RegisterCta from "../components/RegisterCta/RegisterCta";
import PledgeForm from "../components/PledgeForm/PledgeForm";

function ProjectDetailTemplate() {
  // State
  const [projectData, setProjectData] = useState();
  const [projectPledgeAmount, setProjectPledgeAmount] = useState();
  const [projectGoalPercentage, setGoalPercentage] = useState();

  // Hooks
  const { id } = useParams();

  // Actions & Helpers
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
    .then((results) => {
        return results.json();
    })
    .then((data) => {
        setProjectData(data);
        
        const totalPledges = data.pledges
            // eslint-disable-next-line eqeqeq
            .filter (pledge => pledge.project_id == id)
            // reducing your list to an output value
            .reduce ((sum, pledge) => sum + pledge.amount, 0)
        setProjectPledgeAmount(totalPledges);
        
        const goalPercentage = (totalPledges / data.goal) * 100
        setGoalPercentage(goalPercentage);
    })
  }, [id]);

  // Loading State
  if (!projectData) {
    return <h3>Loading project....</h3>;
  }

  // Normal State
  return (
    <main>
      <div className="project-header">
        <h1>{projectData.title}</h1>
        <h3>Influcencer: <ProjectOwner owner={projectData.owner}/></h3>
      </div>

      <div className="project-details">
        <img src={projectData.image} />
        <div className="project-details-text">
          <h3>Project Details</h3>
          <p class="project-description">{projectData.description}</p>
          <ul>
            <li>Project Starting: {new Date(projectData.date_start).toLocaleString('en-AU',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
            <li>Project Ending:  {new Date(projectData.date_ending).toLocaleString('en-AU',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
            <li>{`Status: ${projectData.is_open}`}</li>
          </ul>
        </div>
      </div>

      <div className="pledges-total">
        <div className="pledges-figures">
          <h4>Goal: ${projectData.goal}</h4>
          <h4>Total Raised: ${projectPledgeAmount}</h4>
        </div>
          <PledgeProgress completed={projectGoalPercentage} bgcolor={"#FCA571"} /> 
        </div>

      <div className="project-pledges-comments">
        <div className="project-pledges">
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

        <div className="project-comments">
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
      </div>
      <PledgeForm />
      <RegisterCta />

    </main>
  );
}

export default ProjectDetailTemplate;