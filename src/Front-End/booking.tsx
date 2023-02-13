import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import HomeImg from "../img/home1.jpg"
import DatePicker from 'react-date-picker';
import DatePicker2 from 'react-date-picker';
import { Roomss } from '../components/listRooms';
import Rooms from './rooms';


export default function Booking(){
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [ roomType, setRoomtype] = useState("");
    let [value, onChange] = useState(new Date());
    let [value1, onChange1] = useState(new Date());
    let [rooms, setRooms] = useState<Roomss[]>([])
    

    useEffect( ()=>{
      let roomId = new URLSearchParams(window.location.search).get("room");
      if (roomId !== null){
        setRoomtype(roomId)
      }
    },
    []
    )   

    useEffect(()=>{
try{
  fetch("/roomsData")
  .then(res => res.json())
  .then(({RoomsData}) => {
     setRooms(RoomsData)
})

}catch(error){}
  }, [])

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
              {rooms && rooms.map((room)=> (
              <option value={room.RoomId} key={room.RoomId}>{room.NameOfRoom}</option>
            ))}
          </select>
          <h3>Starting Day</h3>
          <DatePicker onChange={onChange} value={value} />
          <h3>Ending Day Day</h3>
          <DatePicker2 onChange={onChange1} value={value1} />
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
      <img src={HomeImg} alt="Image" className="HomeImg"/>
      </>
       );
    }
    
