const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,


image: {
        // type: String,
        // default:
        //      "https://www.travelandleisure.com/thmb/hOMw3mMJjBeQ-tP3_-TcXIDwexI=/1800x1200/filters:fill(auto,1)/header-jw-marriott-guanacaste-resort-spa-COSTARICARESORT0622-2ef67a17a7564c0b82832245e42387b8.jpg",
        // set: (v) =>
        //     v === ""
        // ? "https://www.travelandleisure.com/thmb/hOMw3mMJjBeQ-tP3_-TcXIDwexI=/1800x1200/filters:fill(auto,1)/header-jw-marriott-guanacaste-resort-spa-COSTARICARESORT0622-2ef67a17a7564c0b82832245e42387b8.jpg"
        // : v,
        filename: String,
        url: String,
},
price: Number,
location: String,
country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;