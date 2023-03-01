import React, { useState, useEffect } from "react";
import { Room } from "./Interface";
import { totalPrice } from "./totalPrice";

export interface PricingProps {
  RoomId: number;
  occupants: number;
  NumberOfNights: number
}

export default function Pricing({ RoomId, occupants, NumberOfNights }: PricingProps) {
  let [Costs, setCost] = useState(0);
  let newPrice = Costs / 100;
  let numberFormat = Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
  }).format(newPrice);
  useEffect(() => {
    try {
      fetch("/roomsData")
        .then((res) => res.json())
        .then(({ RoomsData }: { RoomsData: Room[] }) => {
          let RoomPrice = RoomsData.find((Room) => Room.RoomId == RoomId);
          // (RoomsData)
          if (RoomPrice == undefined) {
            // throw new Error(`No Price found for Id ${RoomId}`)
            return;
          }
          setCost(totalPrice(occupants, RoomPrice, NumberOfNights));
          console.log(RoomsData);
        });
    } catch (error) {}
  }, [RoomId, occupants, NumberOfNights]);

  return (
    <div>
      <div>Total Price: {numberFormat} </div>
    </div>
  );
}
