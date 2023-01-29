import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../index.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Rooms from "./rooms";
import Home from "./home";
import Nav from './nav';

export default function App() {
  return (
    <div>
       <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/rooms' element={<Rooms/>} />
            <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  );
}
