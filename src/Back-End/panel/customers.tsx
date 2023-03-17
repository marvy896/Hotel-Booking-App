import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRightCircle } from "react-icons/bi";

export default function Customers() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [CustomerId, setCustomerId] = useState("");
  
  return (
    <div className="Panel">
      <div className="Panel1">
        <h1>Welcome to the Customers</h1>
      </div>
      <div className="custom2">
        <div className="createDiv">
          <div>
            Create Customers
            <form>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                type="text"
                name="firstName"
                required
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                type="text"
                name="lastName"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                name="email"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                type="text"
                name="Phone"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                required
              />

              <button>Create Customers</button>
            </form>
          </div>
          <div>
            Update Customers
            <form>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                type="text"
                name="firstName"
                required
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                type="text"
                name="lastName"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                name="email"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                type="text"
                name="Phone"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                required
              />

              <button>Update Customers</button>
            </form>
          </div>
        </div>
        <div className="createDiv">
          <div>
            Remove Customers
            <form>
              <input
                value={CustomerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="CustomerId"
                type="text"
                name="Description"
                required
              />
              <button>Remove</button>
            </form>
          </div>
          <div>Retrieve Customers</div>
        </div>
      </div>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <div className="FirstDiv">
          Back{" "}
          <div className="circle">
            <BiChevronRightCircle />
          </div>
        </div>
      </Link>
    </div>
  );
}
