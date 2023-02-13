import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./nav";
import { Roomss } from "../components/listRooms";
import ListRooms from "../components/listRooms";


export default function Rooms() {
  let [rooms, setRooms] = useState<Roomss[]>([])
    
  useEffect(()=>{
try{
  fetch("/roomsData")
  .then(res => res.json())
  .then(({RoomsData}) => {
     setRooms(RoomsData)
    console.log(RoomsData);
})

}catch(error){}
  }, [])
   
  return (
    <>
      <div className="nav">
        <Nav />
        <h2>Our Choice</h2>
        <div className="rooms">
          <h1>
            The best Room <br /> Just for you
          </h1>
          <p>
            All of these rooms we serve based on your <br />
            taste. We try to understand your favourite <br />
            room. You can choose the ones that suits you.
          </p>
        </div>
      </div>
      <div className="roommap">
      {rooms && rooms.map(
          (
            item: JSX.IntrinsicAttributes & Roomss
          ) => (
            <div key={item.RoomId}>
              <ListRooms {...item} />
            </div>
          )
        )}
      </div>
    </>
  );
}
