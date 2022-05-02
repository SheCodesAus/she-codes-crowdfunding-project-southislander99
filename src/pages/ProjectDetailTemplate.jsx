import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectOwner from "../components/ProjectOwner/ProjectOwner";
import PledgeSupporter from "../components/PledgeSupporter/PledgeSupporter";
import PledgeProgress from "../../components/PledgeProgress/PledgeProgress";

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
    <main className="grid--container">
      <div class="project-header">
        <h2 className="hero--title">{projectData.title}</h2>
        <h3>Influcencer: <ProjectOwner owner={projectData.owner}/></h3>
      </div>

      <div className="hero--sidebar">
        <img className="hero--image" src={projectData.image} />
          <h3>Project Details</h3>
          <p class="project-description">{projectData.description}</p>
          <ul>
            <li>Project Starting: {new Date(projectData.date_start).toLocaleString('en-AU',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
            <li>Project Ending:  {new Date(projectData.date_ending).toLocaleString('en-AU',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
            <li>{`Status: ${projectData.is_open}`}</li>
          </ul>
          <h4>Goal: {projectData.goal}</h4>
          <div className="pledges-total">
            <h3>Total Raised: ${projectPledgeAmount} Inventi-Cents!</h3>
            
            <PledgeProgress completed={projectGoalPercentage} bgcolor={"#6a1b9a"} />
            
            <h3>{projectData.is_open
            // '? :' are ternary oprators
                // '?' is if true
                // ':' is if false
                // what comes before the ? is the predicate aka 'what you write in the if statement'
                ? projectData.goal > projectPledgeAmount
                    ? "Currently Accepting Pledges"
                    : "We made a lot of money, please give more though 👀"
                : "Invention has been built."}</h3>
        </div>

      </div>


      <div className="grid--container">
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

      <div className="grid--container">
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