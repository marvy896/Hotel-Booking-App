import express, { response } from "express";
import { MongoClient } from "mongodb";
import { Roomss } from "../components/listRooms";
import { totalPrice } from "../components/totalPrice";

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
    res.status(200);
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

  let fetchRoomPrice = client
    .db("HotelDatabase")
    .collection("RoomsData")
    .find({ RoomId: RoomId });

  fetchRoomPrice
    .forEach((a) => {
      let totalPriceRoom = totalPrice(occupants, a as unknown as Roomss);
      bookings["TotalPrice"] = totalPriceRoom;
      console.log("This is ", a);
      console.log("This is the total Price:", totalPriceRoom)
    })
    .then(async () => {
      let result = await client
        .db("HotelDatabase")
        .collection("bookings")
        .insertOne(bookings);
      console.log(
        // data
        `New listing created with the following id: ${result.insertedId}`
      );
      res.status(200).end();
      return;
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
