const mongoose = require("mongoose");
const Review = require("./review.js")

let listingScehma = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:
    {
         url: String,
         filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    },
],
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},

geometry: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
},

category: {
    type: String,
    enum: ["Hotel", "Adventure", "Resort", "Beach-Related", "Restaurant", "Other"],
    required: true,
},
}); 

listingScehma.post("findOneAndDelete", async(listing)=>{
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", listingScehma);
module.exports = Listing; 