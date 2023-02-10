import React from 'react'
import { BiChevronRightCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export interface Roomss {
    RoomId: number,
    NameOfRoom: string,
    Price: number,
    Image:string,
    Description: string
}

export default function ListRooms({
    RoomId, NameOfRoom,Price, Image, Description}: Roomss) {
      let newPrice = Price/100
      let numberFormat = Intl.NumberFormat('en-ng', { style: 'currency', currency: 'NGN', currencyDisplay:"narrowSymbol" }).format(newPrice)
      
  return (
    <div className="roomNums">
        <div>
         <div className="img" style={{backgroundImage: `url(${Image})`}}></div>
          <h4>{NameOfRoom}</h4>
          <p>{Description}</p>
          <p>{numberFormat}</p>
          <Link to="/booking?room=1" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Book{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
    </div>
  )
}
