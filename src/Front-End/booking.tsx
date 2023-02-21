import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import ProgressBar from "@ramonak/react-progress-bar";
import DatePicker from "react-date-picker";
import DatePicker2 from "react-date-picker";
import { Roomss } from "../components/listRooms";
import Footer from "./footer";

export default function Booking() {
  let [occupants, setoccupants] = useState(1);
  let [roomType, setRoomtype] = useState("");
  let [start, setStart] = useState(new Date());
  let [end, setEnd] = useState(new Date());
  let [rooms, setRooms] = useState<Roomss[]>([]);

  useEffect(() => {
    let roomId = new URLSearchParams(window.location.search).get("room");
    if (roomId !== null) {
      setRoomtype(roomId);
    }
  }, []);

  let total = () => {
    let price: number;
    price = 0;
    if (occupants >= 2) {
      price = occupants + 5;
    }
    if (occupants >= 4) {
      price = occupants + 12;
    }
    if (occupants >= 6) {
      price = occupants + 20;
    }
    else{
      return price
    }
  };

  useEffect(() => {
    try {
      fetch("/roomsData")
        .then((res) => res.json())
        .then(({ RoomsData }) => {
          setRooms(RoomsData);
        });
    } catch (error) {}
  }, []);

  let submit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/bookRooms", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ occupants, roomType, start, end, rooms }),
    }).then;
  };

  return (
    <div>
      <div className="member">
        <div>
          <h2>Marvy's Place</h2>
        </div>
        <form className="formBookings" onSubmit={submit}>
          Number of Occupants
          <input
            value={occupants}
            onChange={(e) => setoccupants(+e.target.value)}
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
          <DatePicker onChange={setStart} value={start} />
          <h3>Ending Day Day</h3>
          <DatePicker2 onChange={setEnd} value={end} />
          <button className="bottomForm" onClick={submit}>
            <Link to="/member" style={{ textDecoration: "none" }}>
              <div className="FirstDiv">
                Proceed{" "}
                <div className="circle">
                  <BiChevronRightCircle />
                </div>
              </div>
            </Link>
          </button>
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
        <>Total Price:{total}</>
      </div>
      <ProgressBar completed={10} />
      <Footer />
    </div>
  );
}
