import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import HomeImg from "../img/home1.jpg"
// import "../index1.css";

export default function Form() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  
  return (
    <>
    <div className="member">
      <div>
        <h2>Marvy's Place</h2>
      </div>
      <form>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          type="text"
          name="firstName"
          required
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          type="text"
          name="lastName"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          name="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div className="bottomForm">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="FirstDiv">
            Back{" "}
            <div className="circle">
              <BiChevronRightCircle />
            </div>
          </div>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div className="FirstDiv">
            Member Login{" "}
            <div className="circle">
              <BiChevronRightCircle />
            </div>
          </div>
        </Link>
      </div>
    </div>
    <img src={HomeImg} alt="Image"/>
    </>
  );
}
