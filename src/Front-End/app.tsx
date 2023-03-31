import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../index.css";
import "../Back-End/paymentPage/receipt.css";
import "../Back-End/panel/panel.css";
import Rooms from "./rooms";
import Home from "./home";
import About from './about';
import Member from "./member";
import Login from "./login";
import Booking from './booking';
import Payment from "./payment";
import Receipt from "../Back-End/paymentPage/receipt";
import Panel from '../Back-End/panel/panel';
import Customers from "../Back-End/panel/customers";
import EditRooms from '../Back-End/panel/editRooms';


export default function App() {
  return (
    <div>
       <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/rooms' element={<Rooms/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/member' element={<Member/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/booking' element={<Booking/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/receipt' element={<Receipt/>} />
            <Route path='/customers' element={<Customers/>} />
            <Route path='/editRooms/:id' element={<EditRooms/>} />
            <Route path='/createRooms' element={<EditRooms/>} />
            <Route path='/panel' element={<Panel/>} />
            <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  );
}
