import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";

export default function EditRooms() {
  let [NameOfRoom, setNameOfRoom] = useState("");
  let [Image, setImage] = useState<File>();
  let [Price, setPrice] = useState("");
  let [Description, setDescription] = useState("");
  let [RoomId, setRoomId] = useState("");

  let [upNameOfRoom, setUpNameOfRoom] = useState("");
  let [upImage, setUpImg] = useState("");
  let [upPrice, setUpPrice] = useState("");
  let [upDescription, setUpDescription] = useState("");
  let [uproomId, setUpRoomId] = useState("");

  let createRoom = (e: FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    if (Image == undefined) {
      return;
    }
    formData.append("Image", Image);
    formData.append("NameOfRoom", NameOfRoom);
    formData.append("Price", Price);
    formData.append("Description", Description);
    formData.append("RoomId", RoomId);

    fetch("/createRooms", {
      headers: {
        // "Content-Type": "application/json",
        enctype: "multipart/form-data",
      },
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ id }) => {
        console.log(id);
        console.log(NameOfRoom, Price, Description, Image, RoomId);
        alert( `${NameOfRoom} created Succesfully`);
        return;
      });
  };

  let updateRoom = (e: FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    if (Image == undefined) {
      return;
    }
    formData.append("upImage", upImage);
    formData.append("upNameOfRoom", upNameOfRoom);
    formData.append("upPrice", upPrice);
    formData.append("upDescription", upDescription);
    formData.append("uproomId", uproomId);

    fetch("/updateRooms", {
      headers: {
        // "Content-Type": "application/json",
        enctype: "multipart/form-data",
      },
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ id }) => {
        console.log(id);
        console.log(uproomId, upNameOfRoom, upPrice, upDescription, upImage);
        alert(`${upNameOfRoom} updated Succesfully`);
        return;
      });
  };

  let deleteRoom = (e: FormEvent) => {
    e.preventDefault();
  
    fetch("/deleteRoom", {
      headers: {
        "Content-Type": "application/json",
        // enctype: "multipart/form-data",
      },
      method: "POST",
      body:JSON.stringify({ RoomId}),
    })
      .then((res) => res.json())
      .then(({ id }) => {
        console.log(id);
        alert("Room Deleted Succesfully");
        return;
      });
  };
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
                value={RoomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="RoomId"
                type="text"
                name="RoomId"
                required
              />
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
                // path={img}
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : undefined)
                }
                placeholder="Upload Photo"
                type="file"
                name="Photo"
                required
              />
              <button onClick={createRoom}>Create</button>
            </form>
          </div>
          <div>
            Update Rooms
            <form>
              <input
                value={uproomId}
                onChange={(e) => setUpRoomId(e.target.value)}
                placeholder="Please put in the roomId"
                type="text"
                name="RoomId"
                required
              />
              <input
                value={upNameOfRoom}
                onChange={(e) => setUpNameOfRoom(e.target.value)}
                placeholder="Name of the Room"
                type="text"
                name="NameOfRoom"
                required
              />
              <input
                value={upPrice}
                onChange={(e) => setUpPrice(e.target.value)}
                placeholder="Set Price"
                type="text"
                name="Price"
                required
              />
              <input
                value={upDescription}
                onChange={(e) => setUpDescription(e.target.value)}
                placeholder="Description"
                type="text"
                name="Description"
                required
              />
              <input
                value={upImage}
                onChange={(e) => setUpImg(e.target.value)}
                placeholder="Upload Photo"
                type="file"
                name="Photo"
                required
              />
              <button onClick={updateRoom}>Update Room</button>
            </form>
          </div>
        </div>
        <div className="createDiv">
          <div>
            Remove Rooms
            <form>
              <input
                value={RoomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room Id"
                type="text"
                name="Enter the room ID"
                required
              />
              <button onClick={deleteRoom }>Remove</button>
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
