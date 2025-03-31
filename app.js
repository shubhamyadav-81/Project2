const express = require("express");
const app = express();
const mongoose = require("mongoose");  
const Listing = require("./models/listing.js"); 
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/listings",async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
});    



app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
 });

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// app.post("/listings", async (req, res) => {
//     let listing = req.body.listing;
//     console.log(listing);
// });

app.post("/listings", async (req, res) => {
const newListing = new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "BY the beach",
//         price: 1000,
//         location: "Goa",
//         country: "India",
//         });

//         await sampleListing.save();
//         console.log("Listing has been saved");
//         res.send("Successful testing");
//     });

    
app.get("/", (req, res) => {
    res.send("Hi, i am root");
    });

    

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });