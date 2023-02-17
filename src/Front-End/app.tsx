import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../index.css";
import Rooms from "./rooms";
import Home from "./home";
import Nav from './nav';
import About from './about';
import Member from "./member";
import Login from "./login";
import Booking from './booking';
import Payment from "./payment";
import ProgressBar from "@ramonak/react-progress-bar";

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
            <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  );
}
