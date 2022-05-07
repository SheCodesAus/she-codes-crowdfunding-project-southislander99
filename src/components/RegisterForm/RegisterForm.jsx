import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  // State
  const [register, setRegister] = useState({
    "username": "",
	"password": "",
	"password2": "",
	"email": "",
  });

  const formFields = [
    {
       id: "username",
       label: "Username",
       placeholder: "Enter your Username",
       type: "text",
    },
    {
        id: "password",
        label: "Password",
        placeholder: "Enter password",
        type: "password",
    },
    {
        id: "password2",
        label: "Password",
        placeholder: "Re-enter password",
        type: "password",
    },
    {
        id: "email",
        label: "Email",
        placeholder: "Enter your Email Address",
        type: "email",
    },
    ]

  // // Hooks
  const navigate = useNavigate();

  // Actions and Helpers
  const handleChange = (event) => {
    const { id, value } = event.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (register.username && register.password && register.password2 && register.email) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}users/register/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: register.username, 
              password: register.password,
              password2: register.password2,
              email: register.email,
            }),
          }
        );
        const data = await response.json();
        console.log(data)
        // THIS IS HOW YOU NAVIGATE AUTOMATICALLY
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

    return ( 
        <form>
            {formFields.map((field, key) => {
                return (
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
                )
            })}
            <button type="submit" onClick={handleSubmit}>
                Register user account
            </button>
        </form>
    )
}

export default RegisterForm;