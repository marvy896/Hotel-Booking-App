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
  const validateCreditCard = (cardNumber: string): boolean => {
    const reversedCardNumberArray = cardNumber.split("").reverse().map(Number);
    let sum = 0;

    for (let i = 0; i < reversedCardNumberArray.length; i++) {
      let digit = reversedCardNumberArray[i];

      if (i % 2 !== 0) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
    }

    return sum % 10 === 0;
  };

  /** To validate the date to make sure its in the future
   * @returns true if the date in in the future otherwise false
   */
  let validateExpiry = (expiry: string): boolean => {
    let currentDate = new Date();

    let [month, year] = expiry.split("/").map(Number);
    let currentYear = currentDate.getFullYear() - 2000;
    let currentMonth = currentDate.getMonth();
    if (year > currentYear || (year == currentYear && month > currentMonth)) {
      return true
    }
    return false
  };

  let validateCvc = (cvc: string):boolean =>{
    return cvc.length == 3
  }

  let submit = (e: FormEvent) => {
    e.preventDefault;

    // let ValidNumb = "4242 4242 4242 4242";
    validateCvc(cvc);
    validateExpiry(expiry);
    validateCreditCard(cardNumber);

    if (validateCvc(cvc) && validateExpiry(expiry) && validateCreditCard(cardNumber)) {
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
