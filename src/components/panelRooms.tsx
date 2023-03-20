import { Room } from "./Interface";
import React from "react";

export default function PanelRooms({
  RoomId,
  NameOfRoom,
  Price,
  Image,
  Description,
}: Room) {
  return (
    <div className="list11">
      <div className="list1">
        <img width={40} style={{ backgroundImage: `url(${Image})` }}></img>
        <h4>Name: {NameOfRoom}</h4>
        <p>Description: {Description}</p>
        <p>Price: #{Price}</p>
        <p>RoomId: {RoomId}</p>
      </div>
      <button>Edit</button>
      <button>Add</button>
    </div>
  );
}
