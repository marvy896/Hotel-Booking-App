import React from "react";
import Nav from "./nav";
import Abot from "../img/about.jpg";

export default function About() {
  return (
    <>
      <Nav />
      <div className="about">
        <div className="imgAbout">
          <img src={Abot} alt="Image" className="HomeImg"/>
        </div>
        <div className="aboutInner">
          <h6>About Us</h6>
          <h3>
            We are the Best Hotel <br />
            We have Experience for 30 years. <br />
            Dont Worry about Our Services...
          </h3>
        </div>
      </div>
    </>
  );
}
