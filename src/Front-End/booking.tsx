import React, { FormEvent, useEffect, useState } from "react";
import { createRoutesFromChildren, Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import ProgressBar from "@ramonak/react-progress-bar";
import DatePicker from "react-date-picker";
import DatePicker2 from "react-date-picker";
import { Roomss } from "../components/listRooms";
import Footer from "./footer";
import Pricing from "../components/price";
import { NumberOfNights, totalPrice } from "../components/totalPrice";

let defaultTime = () => {
  let time = new Date();
  time.setHours(0, 0, 0, 0);
  return time;
};

let endingTime = () => {
  let time1 = defaultTime().getTime();
  let setTime = time1 + 60 * 60 * 24 * 1000;
  let Time = new Date(setTime);
  return Time;
};

export default function Booking() {
  let [occupants, setoccupants] = useState(1);
  let [roomType, setRoomtype] = useState(0);
  let [start, setStart] = useState(defaultTime());
  let [end, setEnd] = useState(endingTime());
  let [rooms, setRooms] = useState<Roomss[]>([]);
  let TotalDays = NumberOfNights(start, end);
  let navigate = useNavigate();

  useEffect(() => {
    let roomId = new URLSearchParams(window.location.search).get("room");
    if (roomId !== null) {
      setRoomtype(+roomId);
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

  let submit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/bookRooms", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ occupants, roomType, start, end, Pricing }),
    })
      .then((res) => res.json())
      .then(({ id }) => {
        console.log(id);
        navigate(`/member?booking=${id}`);
      });
  };

  return (
    <>
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
            min="1"
            name="occupants"
            required
          />
          Pick your favorite Room:
          <select
            value={roomType}
            onChange={(e) => setRoomtype(+e.target.value)}
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
          {TotalDays == 0 && <p>please select a avalid date</p>}
          <button className="bottomForm" onClick={submit}>
            <div style={{ textDecoration: "none" }}>
              <div className="FirstDiv">
                Proceed{" "}
                <div className="circle">
                  <BiChevronRightCircle />
                </div>
              </div>
            </div>
          </button>
        </form>
        <div className="Pricing">
          <Pricing
            RoomId={roomType}
            occupants={occupants}
            NumberOfNights={TotalDays}
          />
        </div>
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
        <ProgressBar completed={20} />
        <Footer />
      </div>
    </>
  );
}
function registerLocale(arg0: string, es: any) {
  throw new Error("Function not implemented.");
}
