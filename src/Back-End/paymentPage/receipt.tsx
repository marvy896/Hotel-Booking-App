import React, { FormEvent, useEffect, useState } from "react";
import Payment from "../../Front-End/payment";

export default function Receipt() {
  useEffect(() => {
    let booked = fetch("/getPayment");
    booked
      .then((res) => res.json())
      .then(({ customerID }) => {
        console.log(customerID);
      })
      
    });
  return (
    <div>
      <div>
        <h1>Receipt of Payment</h1>
        <h4>Date of Payment</h4>
      </div>
    </div>
  );
}
