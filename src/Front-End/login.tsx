import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import HomeImg from "../img/home1.jpg"
// import "../index1.css";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let submit = (email: string, password: string) =>{
    email = "onyex896@gmail.com"
    password = "123"
  }
  return (
    <>
    <div className="member">
      <div>
        <h2>Marvy's Place</h2>
      </div>
      <form>
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
        <div className="bottomForm">
          <Link to="/payment" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Proceed to Payment{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
      </form>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="FirstDiv">
          Back{" "}
          <div className="circle">
            <BiChevronRightCircle />
          </div>
        </div>
      </Link>
    </div>
    <img src={HomeImg} alt="Image" className="HomeImg"/>
    </>
  );
}
