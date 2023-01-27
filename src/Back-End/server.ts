import express, { response } from "express";
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });

client.on('commandStarted', started => console.log(started));
const app = express()
app.use(express.static('dist'))
const port = 3000
app.use(express.json());
app.use('/', express.static('dist'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

