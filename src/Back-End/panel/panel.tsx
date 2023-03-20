import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, FormEvent } from "react";
import { HotelData } from "../utils/data";
import { ReceiptData, Room } from "../../components/Interface";
import PieChart from "../components/pieChart.js";
import { useNavigate } from "react-router-dom";
import PanelRooms from "../../components/panelRooms";
import PanelCustomers from "../../components/PanelCustomers";

Chart.register(CategoryScale);

export default function Panel() {
  let [room, setRoom] = useState<Room[]>([]);
  let [cstDetails, setCstDetails] = useState<ReceiptData[]>([]);
  let navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: HotelData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: HotelData.map((data) => data.userGain),
        backgroundColor: ["rgba(75,192,192,1)", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  let submit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/customers");
  };
  let submit1 = (e: FormEvent) => {
    e.preventDefault();
    navigate("/editRooms");
  };
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
  return (
    <div className="Panel">
      <div className="Panel1">
        <h1>Welcome to the Staff Panel</h1>
        <h3>See the Performance of the Website.</h3>
        <div className="panel4">
          <button onClick={submit1}>Edit Rooms</button>
          <button onClick={submit}>Edit Customers</button>
        </div>
      </div>
      <div className="innerPage">
        <div className="Panel11">
          <div className="view">View Customers</div>
          <div className="view">View Rooms</div>
        </div>
        <div className="panel3">
          <PieChart chartData={chartData} />
        </div>
      </div>
      <div className="list">
        <div>
          {room &&
            room.map((item) => (
              <div key={item.RoomId}>
                <PanelRooms {...item} />
              </div>
            ))}
        </div>
        <div>
          <h2>Confirmed Bookings</h2>
          {cstDetails && 
          cstDetails.map((item) => (
              <div key={item._id} >
                <PanelCustomers {...item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
