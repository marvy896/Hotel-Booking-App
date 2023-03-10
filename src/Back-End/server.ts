import express, { response } from "express";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { MongoClient, ObjectId } from "mongodb";
import { Roomss } from "../components/listRooms";
import { NumberOfNights, totalPrice } from "../components/totalPrice";
import { useEffect } from "react";
import { Room } from "../components/Interface";
import Booking from '../Front-End/booking';

const client = new MongoClient("mongodb://0.0.0.0:27017", {
  monitorCommands: true,
});

client.on("commandStarted", (started) => console.log(started));
const app = express();
app.use(express.static("dist"));
app.set("Access-Control-Allow-Origin", "*");

const port = 4000;
app.use(express.json());
app.use("/", express.static("dist"));
app.use("/rooms", express.static("dist"));
app.use("/booking", express.static("dist"));
app.use("/login", express.static("dist"));
app.use("/member", express.static("dist"));
app.use("/about", express.static("dist"));
app.use("/payment", express.static("dist"));
app.use("/receipt", express.static("dist"));
app.use("/src", express.static("src"));

app.get("/roomsData", (req, res) => {
  let cursor = client.db("HotelDatabase").collection("RoomsData").find({});
  let RoomsData: Roomss[] = [];
  cursor
    .forEach((a) => {
      console.log(a);
      RoomsData.push(a as unknown as Roomss);
    })
    .then(() => {
      res.status(200).json({ RoomsData });
    });
  // console.log(cursor)
});
app.get("/getBookings", (req, res) => {
  let cursor = client.db("HotelDatabase").collection("bookings").find({});
  let BookingsData: Room[] = [];
  // let customer = req.url.split("?")[1];
  // let cust = new URLSearchParams(customer);
  // let data = [cust.get("_Id")];
  // console.log(data)
  cursor
    .forEach((a) => {
      console.log(a);
      BookingsData.push(a as unknown as Roomss);
    })
    .then(() => {
      res.status(200).json({ BookingsData });
    });
  // console.log(cursor)
});

app.post("/customers", async (req, res) => {
  let data = req.body;
  if (
    data.firstName &&
    data.lastName &&
    data.email &&
    data.phone &&
    data.password
  ) {
    let result = await client
      .db("HotelDatabase")
      .collection("Customer")
      .insertOne(data);
    console.log(data);
    res.status(300);
    // res.setHeader(
    //   "Location",
    //   '/payment'
    // );
    res.json({ customerID: result.insertedId }).end();
  } else {
    res.status(400).end();
  }
});

app.post("/bookRooms", async (req, res) => {
  let data = req.body;
  let bookings = data;
  let RoomId = req.body.roomType;
  let occupants = req.body.occupants;
  let StartDay = req.body.start;
  let endDay = req.body.end;

  let fetchRoomPrice = client
    .db("HotelDatabase")
    .collection("RoomsData")
    .find({ RoomId: RoomId });

  fetchRoomPrice
    .forEach((a) => {
      let totalPriceRoom = totalPrice(
        occupants,
        a as unknown as Roomss,
        NumberOfNights(StartDay, endDay)
      );
      // let fetchingDate =
      bookings["TotalPrice"] = totalPriceRoom;
      console.log("This is ", a);
      console.log("This is the total Price:", totalPriceRoom);
      //  console.log(NumberOfNights() * totalPriceRoom);
      return;
    })
    .then(async () => {
      let result = await client
        .db("HotelDatabase")
        .collection("bookings")
        .insertOne(bookings);
      res.status(200);
      res.json({ id: result.insertedId }).end();
      return;
    });
});

app.get("/getPayment", (req, res) => {
  client
    .db("HotelDatabase")
    .collection("bookings")
    .aggregate([
      { $match: { _id: new ObjectId("640a4634f95ba2b818bbf588") } },
      {
        $lookup: {
          from: "Customer",
          localField: "customer",
          foreignField: "_id",
          as: "BookingReference",
        },
      },
    ])
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

app.get("/getPaymentIntent", (req, res) => {
  let userId =  req.query.booking;
  if (userId == null || typeof userId != "string"){
    res.sendStatus(400)
    return;
  }
  let cursor = client
    .db("HotelDatabase")
    .collection("bookings")
    .findOne({ _id: new ObjectId(userId) });

  // let customer = req.url.split("?")[1];
  // let cust = new URLSearchParams(customer);
  // let data = [cust.get("_Id")];
  // console.log(data)
  cursor
    .then((a) => {
      console.log(a);
      if(a == null){
        res.sendStatus(400);
        return
      }
      res.status(200).json({totalPrice: a.TotalPrice});
    });
  // console.log(cursor)
});

//use update to update the booking to get the booking id

app.post("/updateBookings", (req, res) => {
  let bookingId: string = req.body.id;
  let CustomerID: string = req.body.customerID;
  client
    .db("HotelDatabase")
    .collection("bookings")
    .updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { customer: new ObjectId(CustomerID) } }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
