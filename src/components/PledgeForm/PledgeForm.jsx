import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PledgeForm.css";

function PledgeForm() {
    const [amount, setAmmount] = useState("");
    const [comment, setComment] = useState("");
    const [annonymous, setAnnonymous] = useState("");
    const [projectid, setProjectid] = useState("");
    const [message, setMessage] = useState("");

    // const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch(
            `${process.env.REACT_APP_API_URL}pledges/`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                amount: amount,
                comment: comment,
                annonymous: annonymous,
                projectid: projectid,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setAmmount("");
            setComment("");
            setAnnonymous("");
            setProjectid("");
            setMessage("Pledge submitted successfully");
          } else {
            setMessage("Error - pledge not submitted");
          }
          //navigate("/") 
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div class="pledge-form">
            <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                placeholder="Amount"
                onChange={(e) => setAmmount(e.target.value)}
            />
            <input
                type="text"
                value={comment}
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
            />
            <input
                type="text"
                value={annonymous}
                placeholder="annonymous"
                onChange={(e) => setAnnonymous(e.target.value)}
            />
            <input
                type="number"
                value={projectid}
                placeholder="projectid"
                onChange={(e) => setProjectid(e.target.value)}
            />

            <button type="submit">Pledge to project</button>

            <div class="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    );
}

export default PledgeForm;