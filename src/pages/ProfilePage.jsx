import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function ProfilePage() {
  // State
  const [userData, setUserData] = useState();

  // Hooks
  const { id } = useParams();

  // Actions and Helpers
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, [id]);


  // Normal State
  return (
    <main>
      <div class="user-detail">
        <h3>{userData.username}</h3>
        <img src={userData.profile_image} />
          <h3>User Details</h3>
          <ul>
            <li>Bio: {userData.bio}</li>
            <li>Social: {userData.social}</li>
          </ul>
      </div>


      <div class="user-badges">
        <h3>Badges</h3>
      </div>

      <div class="user-projects">
        <h3>List of projects or pledges...</h3>
      </div>

    </main>
  );
}

export default ProfilePage;