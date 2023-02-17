import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import ProgressBar from "@ramonak/react-progress-bar";
import DatePicker from "react-date-picker";
import DatePicker2 from "react-date-picker";
import { Roomss } from "../components/listRooms";
import Rooms from "./rooms";
import Footer from "./footer";

export default function Booking() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [occupants, setoccupants] = useState("");
  let [roomType, setRoomtype] = useState("");
  let [value, onChange] = useState(new Date());
  let [value1, onChange1] = useState(new Date());
  let [rooms, setRooms] = useState<Roomss[]>([]);

  useEffect(() => {
    let roomId = new URLSearchParams(window.location.search).get("room");
    if (roomId !== null) {
      setRoomtype(roomId);
    }
  }, []);

  useEffect(() => {
    try {
      fetch("/roomsData")
        .then((res) => res.json())
        .then(({ RoomsData }) => {
          setRooms(RoomsData);
        });
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="member">
        <div>
          <h2>Marvy's Place</h2>
        </div>
        <form className="formBookings">
          {/* <input
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
          /> */}
          Number of Occupants
          <input
            value={occupants}
            onChange={(e) => setoccupants(e.target.value)}
            placeholder="Number of occupants"
            type="number"
            name="occupants"
            required
          />

          Pick your favorite Room:
          <select
            value={roomType}
            onChange={(e) => setRoomtype(e.target.value)}
          >
            {rooms &&
              rooms.map((room) => (
                <option value={room.RoomId} key={room.RoomId}>
                  {room.NameOfRoom}
                </option>
              ))}
          </select>
          <h3>Starting Day</h3>
          <DatePicker onChange={onChange} value={value} />
          <h3>Ending Day Day</h3>
          <DatePicker2 onChange={onChange1} value={value1} />
          
          <div className="bottomForm">
            <Link to="/member" style={{ textDecoration: "none" }}>
              <div className="FirstDiv">
                Proceed{" "}
                <div className="circle">
                  <BiChevronRightCircle />
                </div>
              </div>
            </Link>
          </div>
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
        Total Price:
      </div>
      <ProgressBar completed={10} />
      <Footer />
    </>
  );
}
