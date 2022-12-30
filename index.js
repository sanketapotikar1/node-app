// const express = require("express"); // importing third party package.
// const MongoClient = require("mongodb");

import express from "express"; // importing third party package.
import { MongoClient } from "mongodb";

const PORT = 4000;


const app = express();

// const MONGO_URL = "mongodb://localhost";
// const MONGO_URL = "mongodb://127.0.0.1"; //  nodejs - 16+
const MONGO_URL = "mongodb+srv://@cluster0.iavuebx.mongodb.net/"; // Atlas link for mongodb

// Node - MongoDB
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();

//API for welcome message
app.get("/", function (req, res) {
  res.send("Welcome Everyone !!! 🌍");
});

// API for get movie by id
app.get("/movies/:id", async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);
  //db.movies.findOne({id:"101"})
  //  const movie = movies.find((mv) => mv.id === id);
  const movie = await client
    .db("movies")
    .collection("movies")
    .findOne({ id: id });
  movie ? res.send(movie) : res.status(404).send({ msg: "Movie is not found" });
});

// API for to get all movies
app.get("/movies", async function (req, res) {
    const movies = await client
    .db("movies")
    .collection("movies")
    .find({ }).toArray();
  movies ? res.send(movies) : res.status(404).send({ msg: "Movies not found" });
});

app.post("/movies", express.json(), async function (req, res) {
  const data = req.body;
  console.log(data);

  const result = await client
    .db("movies")
    .collection("movies")
    .insertMany(data);

  res.send(result);
});

app.listen(PORT);
app.use(express.json());

// app.listen(3000)
