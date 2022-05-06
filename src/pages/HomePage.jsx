import React, { useState, useEffect } from "react";
//import { allProjects } from "../data";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import RegisterCta from "../components/RegisterCta/RegisterCta";

function HomePage() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
        setProjectList(data)
        });
    }, []);

    return (
       <main>
            <div id="hero-banner">
                <div id="hero-banner-text">
                    <h1>Like and Fund Me</h1>
                    <p>Support your favourite social media influencers.<br />They need your likes and dollars.</p>
                    <a href="/" className="button" >Support an influencer</a>
                </div>
                <img id="hero-banner-image" width="600px" src="https://new-cdn.mamamia.com.au/mamamia-pwa.appspot.com/cms_images/variations/1200x800-317613485492.jpg" />
            </div>

            <div className="section-header">
                <h2>Latest Fad Projects!</h2>
            </div>
            <div id="project-list">
                {projectList.slice(0,3).map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;
                } )}
            </div>
            <div className="view-more-cta">
                <a href="/project" class="button" >View more awesome influencer lead projects!</a>
            </div>
            <div className="section-intro">
                <h2>What Is 'Like and Fund Me'?</h2>
                <p>On Like and Fund Me, you can let your followers become active participants joining in on the latest social media influencer projects they love by offering them a way to fund, like and share your projects. You give them eraly access to content to show their support with a community led fan-base and insight into your creative process. In exchange, you get the freedom to do your best work, and still have time to post to the gram.</p>
            </div>
            <RegisterCta />
            
        </main> 
    );
}

export default HomePage;