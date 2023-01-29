import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import HomeImg from "../img/home1.jpg"
import DatePicker from 'react-date-picker';

export default function Booking() {
    let [firstName, setFirstName] = useState("");
   let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [ roomType, setRoomtype] = useState("");
    let [value, onChange] = useState(new Date());
  
    
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
          Pick your favorite Room:
          <select value={roomType} 
            onChange={(e) => setRoomtype(e.target.value)}>
            <option value="PresidentialSuite">Presidential Suite</option>
            <option value="ConnectingRoom">Connecting Room</option>
            <option value="FamilyRoom">Family Room</option>
            <option value="DoubleRoom">Double Room</option>
          </select>
          <DatePicker onChange={onChange} value={value} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            name="email"
            required
          />
          <button type="submit">Confirm Booking</button>
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
        </div>
      </div>
      <img src={HomeImg} alt="Image"/>
      </>
       );
    }
    
