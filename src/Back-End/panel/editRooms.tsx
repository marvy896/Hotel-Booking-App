import React, { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import { Roomss } from "../../components/listRooms";

export default function EditRooms() {
  let [NameOfRoom, setNameOfRoom] = useState("");
  let [Image, setImage] = useState<File>();
  let [Price, setPrice] = useState("");
  let [Description, setDescription] = useState("");
  let [RoomId, setRoomId] = useState("");

  // let [upNameOfRoom, setUpNameOfRoom] = useState("");
  // let [upImage, setUpImg] = useState("");
  // let [upPrice, setUpPrice] = useState("");
  // let [upDescription, setUpDescription] = useState("");
  // let [uproomId, setUpRoomId] = useState("");
  let urlRoomId = useParams().id;
  useEffect(() => {
    if (urlRoomId != undefined) {
      fetch("/roomsData")
        .then((res) => res.json())
        .then(({ RoomsData }: { RoomsData: Roomss[] }) => {
          console.log(RoomsData);
          let room = RoomsData.find((room) => room.RoomId.toString() == urlRoomId);
          if (room == undefined) {
            throw new Error("Room Doesn't Exist");
          }
          setRoomId(room.RoomId.toString());
          setPrice(room.Price.toString());
          setNameOfRoom(room.NameOfRoom);
          setDescription(room.Description);
          // setImage(room.Image);
        });
    }
  }, [urlRoomId]);

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
        alert(`${NameOfRoom} created Succesfully`);
        return;
      });
  };

  let updateRoom = (e: FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    if (Image == undefined) {
      return;
    }
    formData.append("upImage", Image);
    formData.append("upNameOfRoom", NameOfRoom);
    formData.append("upPrice", Price);
    formData.append("upDescription", Description);
    if (urlRoomId == undefined) {
      throw new Error("no roomID");
    }
    formData.append("uproomId", urlRoomId);

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
        console.log(urlRoomId, NameOfRoom, Price, Description, Image);
        alert(`${NameOfRoom} updated Succesfully`);
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
      body: JSON.stringify({ RoomId }),
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
            {urlRoomId != undefined ? (
              <div>Update Rooms</div>
            ) : (
              <div> Create Rooms </div>
            )}
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
              {urlRoomId != undefined ? (
                <button onClick={updateRoom}>Update Room</button>
              ) : (
                <button onClick={createRoom}>Create</button>
              )}
            </form>
          </div>
          {/* <div>
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
          </div> */}
        </div>
        {/* <div className="createDiv">
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
              <button onClick={deleteRoom}>Remove</button>
            </form>
          </div>
          <div>Retrieve Rooms</div>
        </div> */}
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
