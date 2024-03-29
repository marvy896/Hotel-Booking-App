import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";
import ProgressBar from "@ramonak/react-progress-bar";
import Footer from "./footer";
import Booking from './booking';

export default function Form() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  // let [password, setPassword] = useState("");
  // let [Confirmpassword, setConfirmpassword] = useState("");
  let navigate = useNavigate();

  let setBookings = (id:string, customerID: string) => {    
    let booked = fetch("/updateBookings", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({id, customerID})
    });
    return booked;
  };

  let submit = (e: FormEvent) => {
    e.preventDefault();
    // if (password == Confirmpassword) {
      fetch("/customers", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, phone}),
      })
        .then((res) => res.json())
        .then(({ customerID }) => {
          let bookingParam = new URLSearchParams(window.location.search).get(
            "booking"
          );
          console.log(bookingParam);
          if (bookingParam == null){
            throw new Error("Invalid ID");
            }
          setBookings(bookingParam, customerID);
          console.log(customerID);
          
          navigate(`/payment?booking=${bookingParam}`);
        });
  };
  return (
    <>
      <div className="member">
        <div className="member1">
          <h2>Marvy's Place</h2>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Staff Login{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
        </div>
    
        <h3> Please input your Personal Details</h3>
        <form className="formBookings" onSubmit={submit}>
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            type="text"
            name="firstName"
            required
          />
          Last Name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            type="text"
            name="lastName"
            required
          />
          Email Address
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            name="email"
            required
          />
          Phone Number
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            type="text"
            name="Phone"
            required
          />
          {/* <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <input
            value={Confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            name="password"
            required
          /> */}
          <button className="bottomForm" onClick={submit}>
            <div className="FirstDiv">
              Register{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </button>
        </form>
        </div>
        <div className="bottomForm">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Back{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link>
          {/* <Link to="/payment" style={{ textDecoration: "none" }}>
            <div className="FirstDiv">
              Proceed to Payment{" "}
              <div className="circle">
                <BiChevronRightCircle />
              </div>
            </div>
          </Link> */}
      </div>
      <ProgressBar completed={60} />
      <Footer />
    </>
  );
}
