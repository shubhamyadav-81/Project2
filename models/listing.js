const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,


image: {
    type: String,
    default:
         "https://www.travelandleisure.com/thmb/hOMw3mMJjBeQ-tP3_-TcXIDwexI=/1800x1200/filters:fill(auto,1)/header-jw-marriott-guanacaste-resort-spa-COSTARICARESORT0622-2ef67a17a7564c0b82832245e42387b8.jpg",
    set: (v) =>
        v === ""
    ? "https://www.travelandleisure.com/thmb/hOMw3mMJjBeQ-tP3_-TcXIDwexI=/1800x1200/filters:fill(auto,1)/header-jw-marriott-guanacaste-resort-spa-COSTARICARESORT0622-2ef67a17a7564c0b82832245e42387b8.jpg"
    : v,
    // filename: String,
    // url: String,
},
    
price: Number,
location: String,
country: String,
reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "Review",
    },
],
owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
},
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;