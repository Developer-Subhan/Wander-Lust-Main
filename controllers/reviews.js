const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res, next)=>{
    try{
      let listing = await Listing.findById(req.params.id);
      let newReview =  new Review(req.body.review);
      newReview.author = req.user._id
      console.log(newReview);
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();
      req.flash("success", "New Review Added Successfully");
      res.redirect(`/listing/${listing._id}`);  
    }
      catch(err) {
      next(err);
    }
  };
module.exports.destroyReview = async (req, res, next)=>{
    try{
      let {id, reviewId} = req.params;
      await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
      await Review.findByIdAndDelete(reviewId);
      req.flash("success", " Review Deleted Successfully");
      res.redirect(`/listing/${id}`)
    }
    catch(err){
      next(err)
    }
  };