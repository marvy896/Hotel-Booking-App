import React, { FormEvent, useEffect, useState } from "react";
import Payment from "../../Front-End/payment";
import { ReceiptData } from '../../components/Interface';


export default function Receipt() {
  let [receiptData, setReceiptData] = useState <ReceiptData>();
  useEffect(() => {
  let bookingParam = new URLSearchParams(window.location.search).get("booking");
  if (bookingParam == null){
    throw new Error("Invalid ID");
    }
    try {
      fetch(`/getPayment?booking=${bookingParam}`)
        .then((res) => res.json())
        .then((data ) => {
          console.log(data);
          setReceiptData(data)
        });
    } catch (error) {}
  }, []);
  return (
    <div>
      <div>
        <h1>Receipt of Payment</h1>
        <h4>Date of Payment</h4>
      </div>
      <div>{receiptData?.TotalPrice}</div>
      <div>{receiptData?._id}</div>
      <div>{receiptData?.customer._id}</div>
      <div>{receiptData?.customer.email}</div>
      <div>{receiptData?.customer.firstName}</div>
      <div>{receiptData?.customer.lastName}</div>
      <div>{receiptData?.customer.phone}</div>
      <div>{receiptData?.occupants}</div>
      <div>{receiptData?.roomType}</div>
      <div>{receiptData?.start}</div>
      <div>{receiptData?.end}</div>
    </div>
  );
}
