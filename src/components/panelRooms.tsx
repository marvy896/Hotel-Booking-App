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
    <div className="list1">List of Available Rooms
      <img width = {40} style={{ backgroundImage: `url(${Image})`}}></img>
      <h4>{NameOfRoom}</h4>
      <p>{Description}</p>
      <p>{Price}</p>
      <p>{RoomId}</p>
    </div>
  );
}
