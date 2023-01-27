import React from "react"
import {createRoot} from "react-dom/client"
import App from "./app"
import {BrowserRouter} from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById("root") as HTMLDivElement)
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    )
