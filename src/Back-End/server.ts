import express, { response } from "express";
import { MongoClient } from "mongodb";
import { Roomss } from "../components/listRooms";

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
  let Customer = {
    CustomerID: "2001",
    "First Name": "Ada",
    "Last Name": "Gentle",
    email: "adag@gmail.com",
    "Phone number": "9156734512",
    PassWord: "12345",
  };
  let result = await client
    .db("HotelDatabase")
    .collection("Customer")
    .insertOne(Customer);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
    res.status(200).end()

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
