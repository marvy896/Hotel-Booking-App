import React from "react";
import { Link } from "react-router-dom";
import Nav from "./nav";
import Room1 from "../img/room1.jpg";
import Room2 from "../img/room2.jpg";
import Room3 from "../img/room3.jpg";
import Room4 from "../img/room4.jpg";
import { BiChevronRightCircle } from "react-icons/bi";

export default function Rooms() {
  return (
    <>
      <div className="nav">
        <Nav />
        <h2>Our Choice</h2>
        <div className="rooms">
          <h1>
            The best Room <br /> Just for you
          </h1>
          <p>
            All of these rooms we serve based on your <br />
            taste. We try to understand your favourite <br />
            room. You can choose the ones that suits you.
          </p>
        </div>
      </div>
      <div className="roomNums">
        <div>
          <img src={Room1} alt="Image" />
          <h4>Presidential Suite</h4>
          <p>The Facilities offered are of course the best starting</p>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Book{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
        <div>
          <img src={Room2} alt="Image" />
          <h4>Connecting Room</h4>
          <p>Your room and your Family members will be staying next door</p>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Book{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
        <div>
          <img src={Room3} alt="Image" />
          <h4>Family Room</h4>
          <p>This kind of room is suitable for family staying Togther</p>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Book{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
        <div>
          <img src={Room4} alt="Image" />
          <h4>Double Room</h4>
          <p>This type of room has large mattress and is bigger in size.</p>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Book{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
