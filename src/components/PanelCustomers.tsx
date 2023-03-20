import { ReceiptData } from "./Interface";
import React from "react";

export default function PanelCustomers({
  occupants,
  roomType,
  start,
  end,
  TotalPrice,
  Date_of_payment,
  cardNumber,
  customer: { firstName, lastName, email, phone },
}: ReceiptData) {
  let priceFormat = Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
  }).format(TotalPrice);

    let DateFormat = new Intl.DateTimeFormat("en-US").format(
      new Date(Date_of_payment)
    );
  //TODO: format date and price before sending to the database
  //   let DateFormat1 = new Intl.DateTimeFormat("en-US").format(new Date(start));
  //   let DateFormat2 = new Intl.DateTimeFormat("en-US").format(new Date(end));
  return (
    <div className="list1">
      <div>
        <h4>First Name: {firstName}</h4>
        <h4>Last Name: {lastName}</h4>
        {/* <div>UsersId: {_id}</div> */}
        <div>Email: {email}</div>
        <div>Phone No: {phone}</div>
        <div>Date of Payment {DateFormat}</div>
        {/* <div>RoomId: {_id}</div> */}
        <div>Number of Occupants: {occupants}</div>
        <div> Type of Room: {roomType}</div>
        <div>Starting Date: {start}</div>
        <div>Ending Date: {end}</div>
        <div>Card Number: **** **** **** {cardNumber}</div>
        <div>Total Price:{priceFormat}</div>
      </div>
    </div>
  );
}
