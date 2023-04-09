import React, { FormEvent, useEffect, useState } from "react";
import { createRoutesFromChildren, Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import { ReceiptData } from '../../components/Interface';

export default function Receipt() {
  let [receiptData, setReceiptData] = useState<ReceiptData>();
  useEffect(() => {
    let bookingParam = new URLSearchParams(window.location.search).get(
      "booking"
    );
    if (bookingParam == null) {
      throw new Error("Invalid ID");
    }
    try {
      fetch(`/getPayment?booking=${bookingParam}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setReceiptData(data);
        });
    } catch (error) {}
  }, []);
  if (receiptData == undefined){
      return <div>loading</div>
  }   let priceFormat = Intl.NumberFormat("en-ng", {
      style: "currency",
      currency: "NGN",
      currencyDisplay: "narrowSymbol",
    }).format(receiptData?.TotalPrice/100);
    

   let DateFormat = new Intl.DateTimeFormat('en-US').format(new Date(receiptData.Date_of_payment));
   let startDay = new Intl.DateTimeFormat('en-US').format(new Date(receiptData.start));
   let endDay = new Intl.DateTimeFormat('en-US').format(new Date(receiptData.end));

  return (
    <div className="Receipt">
      <div className="Receipt1">
        <h1>Receipt of Payment</h1>
        <h4>Date of Payment: {DateFormat}</h4>
      </div>
      <div className="Receipt2">
        <div className="Receipt3">
          {" "}
          <h1>Personal Data</h1>
          <h4>First Name: {receiptData.customer.firstName}</h4>
          <h4>Last Name: {receiptData.customer.lastName}</h4>
          <div>UsersId: {receiptData.customer._id}</div>
          <div>Email: {receiptData.customer.email}</div>
          <div>Phone No: {receiptData.customer.phone}</div>
        </div>
        <div className="Receipt3">
          {" "}
          <h1>Payment Data</h1>
          <div>RoomId: {receiptData._id}</div>
          <div>Number of Occupants: {receiptData.occupants}</div>
          <div> Type of Room: {receiptData.roomType}</div>
          <div>Starting Date: {startDay}</div>
          <div>Ending Date: {endDay}</div>
          <div>Card Number: **** **** **** {receiptData.cardNumber}</div>
        </div>
      </div>
      <div className="Total">Total Amount Paid: {priceFormat}</div>
      <div className="bottomForm">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Back{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
    </div>
  );
}
