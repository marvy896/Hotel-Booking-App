import express, { json, response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { Roomss } from "../components/listRooms";
import { NumberOfNights, totalPrice } from "../components/totalPrice";
import { ReceiptData, Room } from "../components/Interface";
import multer from "multer";
import bodyParser from "body-parser";
import session from "express-session";
;

const client = new MongoClient("mongodb://0.0.0.0:27017", {
  monitorCommands: true,
});

client.on("commandStarted", (started) => console.log(started));
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.set("Access-Control-Allow-Origin", "*");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// Middleware
const upload = multer({ storage: storage });

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
app.use("/panel", express.static("dist"));
app.use("/customers", express.static("dist"));
app.use("/editRooms/:id", express.static("dist"));
app.use("/createRooms", express.static("dist"));
app.use("/src", express.static("src"));
app.use("/uploads", express.static("uploads"));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { sameSite: "strict", secure: true },
  })
);

let adminOnly = (req: any, res: any, next: any) => {
  if (!req.session.isLoggedIn) {
    res.send("You are not authorized to view this page");
  } else {
    next();
  }
};

app.get("/test", (req, res) => {
  //@ts-ignore
  res.json(req.session.isLoggedIn);
  req.session.reload(() => {
    console.log(req.session);
  });
});
//LOGIN
app.post("/login", (req, res) => {
  let body = req.body;
  if (body.email == "onyex896@gmail.com" && body.password == "123") {
    //@ts-ignore
    req.session.isLoggedIn = true
    return res.sendStatus(200);
  } else {
    res.status(404).send("Please Verify your details");
  }
});

app.get("/roomsData", (_req, res) => {
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
app.get("/getPayments", (_req, res) => {
  let cursor = client.db("HotelDatabase").collection("bookings").find({});
  let getDetails: ReceiptData[] = [];
  cursor
    .forEach((a) => {
      console.log(a);
      getDetails.push(a as unknown as ReceiptData);
    })
    .then(() => {
      res.status(200).json(getDetails);
    });
  // console.log(cursor)
});
app.get("/getPaymentData", (req, res) => {
  client
    .db("HotelDatabase")
    .collection("bookings")
    .aggregate([
      { $match: { Date_of_payment: { $exists: true } } },
      {
        $lookup: {
          from: "Customer",
          localField: "customer",
          foreignField: "_id",
          as: "joinedData",
        },
      },
    ])
    .toArray()
    .then((result) => {
      for (let data of result) {
        data.customer = data.joinedData[0];
        if (data.customer != undefined) {
          delete data.customer.password;
        }
        delete data.joinedData;
      }
      res.json(result);
    })
    .catch((_error) => {
      res.sendStatus(500);
    });
});
app.get("/getBookings", (_req, res) => {
  let cursor = client.db("HotelDatabase").collection("bookings").find({});
  let BookingsData: Room[] = [];
  cursor
    .forEach((a) => {
      console.log(a);
      BookingsData.push(a as unknown as Roomss);
    })
    .then(() => {
      res.status(200).json({ BookingsData });
    });
});

app.get("/getSpecBookings", (req, res) => {
  let userId = req.query.booking;
  if (userId == null || typeof userId != "string") {
    res.sendStatus(400);
    return;
  }
  let cursor = client
    .db("HotelDatabase")
    .collection("bookings")
    .findOne({ _id: new ObjectId(userId) });
  cursor.then((a) => {
    console.log(a);
    if (a == null) {
      res.sendStatus(400);
      return;
    }
    res.status(200).json({ a });
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
  let userId = req.query.booking;
  if (userId == null || typeof userId != "string") {
    res.sendStatus(400);
    return;
  }
  client
    .db("HotelDatabase")
    .collection("bookings")
    .aggregate([
      { $match: { _id: new ObjectId(userId) } },
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
      let data = result[0];
      data.customer = data.BookingReference[0];
      delete data.customer.password;
      delete data.BookingReference;

      res.json(data);
    })
    .catch((_error) => {
      res.sendStatus(500);
    });
});

app.get("/getPaymentIntent", (req, res) => {
  let userId = req.query.booking;
  if (userId == null || typeof userId != "string") {
    res.sendStatus(400);
    return;
  }
  let cursor = client
    .db("HotelDatabase")
    .collection("bookings")
    .findOne({ _id: new ObjectId(userId) });
  cursor.then((a) => {
    console.log(a);
    if (a == null) {
      res.sendStatus(400);
      return;
    }
    res.status(200).json({ totalPrice: a.TotalPrice });
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
app.post("/updatePayments", (req, res) => {
  let bookingId: string = req.body.bookingParam;
  let paymentDate: string = req.body.dateOfPayment;
  let cardNumber: string = req.body.cardNumber;

  client
    .db("HotelDatabase")
    .collection("bookings")
    .updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          Date_of_payment: paymentDate,
          cardNumber: cardNumber,
        },
      }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//CREATE ROOMS AND CUSTOMERS
app.post("/createCustomers", async (req, res) => {
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
    res.json({ customerID: result.insertedId }).end();
  } else {
    res.status(400).end();
  }
});
app.post("/createRooms",adminOnly, upload.single("Image"), async (req, res) => {
  let data = req.body;
  data.Image = req.file ? "/" + req.file.path.replace("\\", "/") : undefined;
  data.Price = parseInt(data.Price);
  data.RoomId = parseInt(data.RoomId);
  if (
    data.NameOfRoom &&
    data.Price &&
    data.Description &&
    data.Image &&
    data.RoomId
  ) {
    let result = await client
      .db("HotelDatabase")
      .collection("RoomsData")
      .insertOne(data);
    console.log(data);
    res.status(200);
    res.json({ roomId: result.insertedId }).end();
  } else {
    res.status(400).end();
  }
});
//UPDATE FOR ROOMS AND CUSTOMERS
app.post("/updateRooms",adminOnly, upload.single("upImage"), (req, res) => {
  let roomId = parseInt(req.body.uproomId);
  let roomName: string = req.body.upNameOfRoom;
  let price = parseInt(req.body.upPrice);
  let description: string = req.body.upDescription;
  let upload = req.file ? "/" + req.file.path.replace("\\", "/") : undefined;

  client
    .db("HotelDatabase")
    .collection("RoomsData")
    .updateOne(
      { RoomId: roomId },
      {
        $set: {
          NameOfRoom: roomName,
          Price: price,
          Description: description,
          Image: upload,
        },
      }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
//Delete Room
app.post("/deleteRoom",adminOnly,  (req, res) => {
  let roomId = parseInt(req.body.RoomId);
  if (roomId) {
    client
      .db("HotelDatabase")
      .collection("RoomsData")
      .deleteMany({ RoomId: roomId });
    res.status(200);
    res.json({ roomId }).end();
  } else {
    res.status(400).end();
  }
});
//     .catch((error) => {
//       console.log(error);
//       res.sendStatus(500).end()
//     })
//     res.sendStatus(200).end();
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
