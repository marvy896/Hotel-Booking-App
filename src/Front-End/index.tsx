import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import {createRoot} from "react-dom/client"
import App from './app'

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    )