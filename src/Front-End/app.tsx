import React from "react";
import { BiChevronRightCircle } from "react-icons/bi";
import HomeImg from "../img/home.jpg"

export default function App() {
  return (
    <>
    <div className="nav">
      <div className="nav1">
        <h2>Marvy's Place</h2>
        <ul>
          <a href="" style={{ textDecoration: "none", color: "white" }}>Home</a>
          <a href="" style={{ textDecoration: "none", color: "white" }}>Services</a>
          <a href="" style={{ textDecoration: "none", color: "white" }}>Rooms</a>
          <a href="" style={{ textDecoration: "none", color: "white"}}>About Us</a>
        </ul>
        <button>Join Member</button>
      </div>
      <div className="nav2">
        <h1>
          Giving the BEST <br /> Just for You
        </h1>
        <ul>
          <a href="" style={{ textDecoration: "none", color: "white" }} className = "ullink">Book a Hotel Room <BiChevronRightCircle /></a>
          <a href="" style={{ textDecoration: "none", color: "white" }}  className = "ullink">Call a Room Service <BiChevronRightCircle /></a>
          <a href="" style={{ textDecoration: "none", color: "white" }} className = "ullink">View Hotel Services <BiChevronRightCircle /></a>
        </ul>
      </div>
    </div>
      <img src={HomeImg} alt="Image"/>
      </>
  );
}
