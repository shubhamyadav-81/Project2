const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

Main()
.then(() => {
    console.log("Connected to MongoDB");
    })
.catch((err) => {
    console.log(err);
    });

async function Main() {
    await mongoose.connect(MONGO_URL);
    }

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67fc0f45a3a12ca49f221671" }));
    await Listing.insertMany(initData.data);
    console.log("Data has been initialized");
    };

initDB();    