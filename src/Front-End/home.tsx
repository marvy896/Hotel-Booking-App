import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import HomeImg from "../img/home.jpg"
import Nav from "./nav";

export default function Home() {
  return (
    <>
    <div className="nav">
    <Nav/>
      <div className="nav2">
        <h1>
          Giving the BEST <br /> Just for You
        </h1>
        <ul>
          <Link to="/rooms" style={{ textDecoration: "none", color: "white" }} className = "ullink">Book a Hotel Room <BiChevronRightCircle /></Link>
          <Link to="" style={{ textDecoration: "none", color: "white" }}  className = "ullink">Call a Room Service <BiChevronRightCircle /></Link>
          <Link to="" style={{ textDecoration: "none", color: "white" }} className = "ullink">View Hotel Services <BiChevronRightCircle /></Link>
        </ul>
      </div>
    </div>
      <img src={HomeImg} alt="Image"/>
      </>
  );
}
