import express, { response } from "express";
import { MongoClient } from 'mongodb';
import { Roomss } from "../components/listRooms";
import Rooms from '../Front-End/rooms';

let db;

const client = new MongoClient('mongodb://0.0.0.0:27017', { monitorCommands: true });

client.on('commandStarted', started => console.log(started));
const app = express()
app.use(express.static('dist'))
app.set('Access-Control-Allow-Origin', '*');

const port = 4000
app.use(express.json());
app.use('/', express.static('dist'))
app.use("/rooms", express.static('dist'))
app.use("/booking", express.static('dist'))
app.use("/src", express.static('src'))

app.get( "/roomsData", ( req, res)=>{
  let cursor = client.db("HotelDatabase").collection("RoomsData").find({})
  let RoomsData:Roomss[] = []
  cursor.forEach( (a)=>{
    console.log(a)
    RoomsData.push(a as unknown  as  Roomss)
  }).then(() => {
  res.status(200).json({RoomsData})
  })
  // console.log(cursor)
})

  




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

