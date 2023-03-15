import React, { FormEvent, useEffect, useState } from "react";
import Payment from "../../Front-End/payment";
import { ReceiptData } from "../../components/Interface";

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
  return (
    <div className="Receipt">
      <div className="Receipt1">
        <h1>Receipt of Payment</h1>
        <h4>Date of Payment</h4>
      </div>
      <div className="Receipt2">
        <div className="Receipt3">
          {" "}
          <h1>Personal Data</h1>
          <h4>First Name: {receiptData?.customer.firstName}</h4>
          <h4>Last Name: {receiptData?.customer.lastName}</h4>
          <div>UsersId: {receiptData?.customer._id}</div>
          <div>Email: {receiptData?.customer.email}</div>
          <div>Phone No: {receiptData?.customer.phone}</div>
        </div>
        <div className="Receipt3">
          {" "}
          <h1>Payment Data</h1>
          <div>RoomId: {receiptData?._id}</div>
          <div>Number of Occupants: {receiptData?.occupants}</div>
          <div> Type of Room: {receiptData?.roomType}</div>
          <div>Starting Date: {receiptData?.start}</div>
          <div>Ending Date: {receiptData?.end}</div>
        </div>
      </div>
      <div className="Total">Total Amount Paid: {receiptData?.TotalPrice}</div>
    </div>
  );
}
