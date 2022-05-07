import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {

//state
const [credentials, setCredentials] = useState({
    username: "", 
    password: "",
})


//hooks
const navigate = useNavigate();

// ..actions and helpers

const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
    }));
};

const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api-token-auth/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        const data = await response.json();
        console.log(data)
        window.localStorage.setItem("token", data.token);  
        navigate("/")  
        } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form>
        <div className="input-field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;