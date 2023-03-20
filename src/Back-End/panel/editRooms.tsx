import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";





export default function EditRooms() {
  let [NameOfRoom, setNameOfRoom] = useState("");
  let [img, setImg] = useState("");
  let [Price, setPrice] = useState("");
  let [Description, setDescription] = useState("");
  let [roomId, setRoomId] = useState("");
  return (
    <div className="Panel">
      <div className="Panel1">
        <h1>Welcome to the Rooms</h1>
      </div>
      <div className="custom2">
        <div className="createDiv">
          <div>
            Create Rooms
            <form>
              <input
                value={NameOfRoom}
                onChange={(e) => setNameOfRoom(e.target.value)}
                placeholder="Name of the Room"
                type="text"
                name="NameOfRoom"
                required
              />
              <input
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Set Price"
                type="text"
                name="Price"
                required
              />
              <input
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                type="text"
                name="Description"
                required
              />
              <input
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Upload Photo"
                type="text"
                name="Photo"
                required
              />
              <button>Create</button>
            </form>
          </div>
          <div>
            Update Rooms
            <form>
              <input
                value={NameOfRoom}
                onChange={(e) => setNameOfRoom(e.target.value)}
                placeholder="Name of the Room"
                type="text"
                name="NameOfRoom"
                required
              />
              <input
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Set Price"
                type="text"
                name="Price"
                required
              />
              <input
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                type="text"
                name="Description"
                required
              />
              <input
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Upload Photo"
                type="text"
                name="Photo"
                required
              />
              <button>Update Room</button>
            </form>
          </div>
        </div>
        <div className="createDiv">
          <div>
            Remove Rooms
            <form>
              <input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room Id"
                type="text"
                name="Description"
                required
              />
              <button>Remove</button>
            </form>
          </div>
          <div>Retrieve Rooms</div>
        </div>
      </div>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <div className="FirstDiv">
          Back{" "}
          <div className="circle">
            <BiChevronRightCircle />
          </div>
        </div>
      </Link>
    </div>
  );
}

