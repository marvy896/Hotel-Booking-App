import React, { useEffect, useState } from "react";
import Nav from "./nav";
import CreditCardInput from "react-credit-card-input";
import { Link } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";

export default function Payment() {
  let [cardNumber, setCardNumber] = useState("");
  let [expiry, setExpiry] = useState("");
  let [cvc, setCvc] = useState("");

  return (
    <div className="paymentPage">
      <Nav />
      <div className="paymentPageInner1">
        <h2 className="paymentPageInner">Card Details</h2>
        <CreditCardInput
          cardNumberInputProps={{
            value: cardNumber,
            onChange: (e: any) => setCardNumber(e.target.value),
          }}
          cardExpiryInputProps={{
            value: expiry,
            onChange: (e: any) => setExpiry(e.target.value),
          }}
          cardCVCInputProps={{
            value: cvc,
            onChange: (e: any) => setCvc(e.target.value),
          }}
          fieldClassName="input"
        />
        <h3>Total Amount:</h3>
        <Link to="/" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Proceed{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
      </div>
    </div>
  );
}
