import React, { FormEvent, useEffect, useState } from "react";
import Payment from "../../Front-End/payment";

export default function Receipt() {
  // useEffect(() => {
  //   try {
  //     fetch("/getPayment")
  //       .then((res) => res.json())
  //       .then((Data ) => {
  //       console.log(Data);
  //       });
  //   } catch (error) {}
  // }, []);

  return (
    <div>
      <div>
        <h1>Receipt of Payment</h1>
        <h4>Date of Payment</h4>
      </div>
    </div>
  );
}
