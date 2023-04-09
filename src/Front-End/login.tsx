import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import HomeImg from "../img/home1.jpg";
// import "../index1.css";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  let submit = (e: FormEvent) => {
    e.preventDefault();

    if (email && password) {
      fetch("/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if(res.ok) return res.text();
          else return Promise.reject(res)
        })
        .then(() => {
          sessionStorage.setItem('isLoggedIn', JSON.stringify(true))
          navigate('/panel', { replace: true })
        })
        .catch((error) => {
          console.log(error);
          alert(error.statusText);
        });
    } else {
      alert("invalid Details");
    }
  };

  return (
    <>
      <div className="member">
        <div>
          <h2>Marvy's Place</h2>
        </div>
        <form className="formBookings">
          Please input Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            name="email"
            required
          />
          Input Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <button className="bottomForm" onClick={submit}>
            <div className="FirstDiv">
              Login{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </button>
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
      <img src={HomeImg} alt="Image" className="HomeImg" />
    </>
  );
}
