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
    // <div className="list1">
      <div>
        <table className="customers">
          {/* <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Date of Payment</th>
              <th>Number of Occupants</th>
              <th>Type of Room</th>
              <th>Starting Date</th>
              <th>Ending Date:</th>
              <th>Card Number</th>
              <th>Total Price</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{DateFormat}</td>
              <td>{occupants}</td>
              <td>{roomType}</td>
              <td>{start}</td>
              <td>{end}</td>
              <td>**** **** **** {cardNumber}</td>
              <td>{priceFormat}</td>
            </tr>
          </tbody>
        </table>
        {/* <h4>First Name: {firstName}</h4>
        <h4>Last Name: {lastName}</h4> */}
        {/* <div>UsersId: {_id}</div> */}
        {/* <div>Email: {email}</div>
        <div>Phone No: {phone}</div>
        <div>Date of Payment {DateFormat}</div> */}
        {/* <div>RoomId: {_id}</div> */}
        {/* <div>Number of Occupants: {occupants}</div>
        <div> Type of Room: {roomType}</div>
        <div>Starting Date: {start}</div>
        <div>Ending Date: {end}</div>
        <div>Card Number: **** **** **** {cardNumber}</div>
        <div>Total Price:{priceFormat}</div> */}
      </div>
    // </div>
  );
}
