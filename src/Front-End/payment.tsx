import React, { FormEvent, useEffect, useState } from "react";
import Nav from "./nav";
import CreditCardInput from "react-credit-card-input";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import Footer from "./footer";
import ProgressBar from "@ramonak/react-progress-bar";
import DatePicker from "react-date-picker";
// import ProgressBar from "@ramonak/react-progress-bar";

export default function Payment() {
  let [cardNumber, setCardNumber] = useState("");
  let [expiry, setExpiry] = useState("");
  let [cvc, setCvc] = useState("");
  let navigate = useNavigate();
  let [price, setPrice] = useState(0);
  let [dateOfPayment, setDateOfPayment] = useState(new Date());
  let bookingParam = new URLSearchParams(window.location.search).get("booking");
  // console.log(bookingParam);
  if (bookingParam == null) {
    throw new Error("Invalid ID");
  }

  useEffect(() => {
    try {
      fetch(`/getPaymentIntent?booking=${bookingParam}`)
        .then((res) => res.json())
        .then(({ totalPrice }) => {
          // console.log(totalPrice);
          setPrice(totalPrice);
        });
    } catch (error) {}
  }, []);

  let numberFormat = Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
  }).format(price / 100);

  let updatePayment = (
    cardNumber: string,
    dateOfPayment: string | Date,
    bookingParam: any
  ) => {
    let fetched = fetch("/updatePayments", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ cardNumber, dateOfPayment, bookingParam }),
    })
      .then((res) => res.json())
      .then(({ id }) => {
        console.log(id);
        console.log(cardNumber, dateOfPayment, bookingParam);
        navigate(`/receipt?booking=${bookingParam}`);
      });
    return fetched;
  };

  let submit = (e: FormEvent) => {
    e.preventDefault;
    let ValidNumb = "4242 4242 4242 4242";
    let validCvc = "234";
    let validExpirybe = "12 / 23";

    if (cardNumber == ValidNumb && expiry == validExpirybe && cvc == validCvc) {
      //TODO: ADD Card paymenet on server
      //TODO: ADD Payment Date to server
      let card = cardNumber.split(" ", 4).reverse()[0];
      console.log(card);
      updatePayment(card, dateOfPayment, bookingParam);
    } else {
      alert("Please input a valid number");
      
    }
  };

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
        <h3>Payment Day</h3>
        <DatePicker onChange={setDateOfPayment} value={dateOfPayment} />
        {/* <button className="bottomForm" onClick={submit}>
          <div className="FirstDiv">
            Register{" "}
            <div className="circle">
              <BiChevronRightCircle />
            </div>
          </div>
        </button> */}
        <div className="Total1">Total Amount: {numberFormat}</div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="FirstDiv" onClick={submit}>
            Pay Now{" "}
            <div className="circle">
              <BiChevronRightCircle />
            </div>
          </div>
        </Link>
      </div>
      <ProgressBar completed={80} />
      <Footer />
    </div>
  );
}
