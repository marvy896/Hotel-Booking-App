import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, FormEvent } from "react";
// import { HotelData, PieData } from '../utils/data';
import { ReceiptData, Room } from "../../components/Interface";
import RoomTypePieChart from "../utils/data";
import { useNavigate, Navigate } from "react-router-dom";
import PanelRooms from "../../components/panelRooms";
import PanelCustomers from "../../components/PanelCustomers";
Chart.register(CategoryScale);

export default function Panel() {
  if (!sessionStorage.getItem("isLoggedIn")) {
    return <Navigate to="/login" />;
  }
  let [room, setRoom] = useState<Room[]>([]);
  let [cstDetails, setCstDetails] = useState<ReceiptData[]>([]);
  let navigate = useNavigate();

  let submit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/customers");
  };
  // let submit1 = (e: FormEvent) => {
  //   e.preventDefault();
  //   navigate("/editRooms");
  // };
  useEffect(() => {
    try {
      fetch("/roomsData")
        .then((res) => res.json())
        .then(({ RoomsData }) => {
          console.log(RoomsData);
          setRoom(RoomsData);
        });
    } catch (error) {}
  }, []);
  if (room == undefined) {
    return <div>loading....</div>;
  }
  useEffect(() => {
    try {
      fetch("/getPaymentData")
        .then((res) => res.json())
        .then((receiptData) => {
          console.log(receiptData);
          setCstDetails(receiptData);
        });
    } catch (error) {}
  }, []);
  if (cstDetails == undefined) {
    return <div>loading....</div>;
  }
  let onClickAddRoom = () => {
    let path = `/createRooms`;
    navigate(path);
  };

  return (
    <div className="Panel">
      <div className="Panel1">
        <h1>Welcome to the Staff Panel</h1>
        <h3>See the Performance of the Website.</h3>
        <div className="panel4">
          <button
            onClick={() => {
              sessionStorage.removeItem("isLoggedIn");
              navigate("/login", { replace: true });
            }}
          >
            Log out
          </button>
          <button onClick={submit}>Edit Customers</button>
        </div>
      </div>
      <div className="panel3">
        <RoomTypePieChart bookingData={cstDetails} />
      </div>
      {/* <div className="innerPage"> */}
      {/* <div className="Panel11">
          <div className="view">View Customers</div>
          <div className="view">View Rooms</div>
        </div> */}
      {/* <div className="panel3">
          <PieChart chartData={chartData} />
        </div>
      </div> */}
      <div className="list">
        <div className="listPanel">
          <h2>Available Rooms</h2>
          {room &&
            room.map((item) => (
              <div key={item._id}>
                <PanelRooms {...item} />
              </div>
            ))}
          <button onClick={onClickAddRoom}>Add Room</button>
        </div>
        <div className="listPanel">
          <h2>Confirmed Bookings</h2>
          <div className="parentTable">
            <table className="customers">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Date of Payment</th>
                  <th>Number of Occupants</th>
                  <th>Type of Room</th>
                  <th>Starting Date</th>
                  <th>Ending Date:</th>
                  <th>Card Number</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cstDetails &&
                  cstDetails.map((item, index) => (
                    <tr key={index}>
                      <PanelCustomers {...item} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* {cstDetails &&
            cstDetails.map((item) => (
              <div key={item._id}>
                <PanelCustomers {...item} />
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
}
