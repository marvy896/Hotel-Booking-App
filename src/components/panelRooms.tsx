import { Room } from "./Interface";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function PanelRooms({
  RoomId,
  NameOfRoom,
  Price,
  Image,
  Description,
}: Room) {
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
        alert(`${NameOfRoom} Deleted Succesfully`);
        return;
      });
  };
  let navigate = useNavigate();
  let changeRoute = () => {
    let path = `/editRooms`;
    navigate(path);
    return <div>....redirecting</div>
  };
  return (
    <div className="list11">
      <div className="list1">
        <img width={100} style={{ backgroundImage: `url(${Image})` }}></img>
        <h4>Name: {NameOfRoom}</h4>
        <p>Description: {Description}</p>
        <p>Price: #{Price}</p>
        <p>RoomId: {RoomId}</p>
      </div>
      <button onClick={deleteRoom}>Delete</button>
      <button onClick={changeRoute}>Add</button>
    </div>
  );
}
