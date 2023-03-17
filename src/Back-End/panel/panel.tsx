import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, FormEvent } from 'react';
import { HotelData } from "../utils/data";
import Customers from "./customers";
// import "./styles.css";
import PieChart from "../components/pieChart.js";
import { useNavigate } from "react-router-dom";
Chart.register(CategoryScale);


export default function Panel() {
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
  let submit = (e: FormEvent) =>{
    e.preventDefault()
    navigate('/customers');
  }
  let submit1 = (e: FormEvent) =>{
    e.preventDefault()
    navigate('/editRooms');
  }
  return (
    <div className="Panel">
      <div className="Panel1">
        <h1>Welcome to the Staff Panel</h1>
        <h3>See the Performance of the Website.</h3>
      </div>
      <div className="panel4">
        <button onClick={submit1}>Edit Rooms</button>
        <button onClick={submit}>Edit Customers</button>
      </div>
      <div className="panel3">
        <PieChart chartData={chartData} />
      </div>
    </div>
  );
}
