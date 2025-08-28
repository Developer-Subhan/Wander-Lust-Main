const express = require("express");
const router = express.Router({mergeParams: true});
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const reviewController = require("../controllers/reviews.js");



//POST REVIEW ROUTRE
router.post("", isLoggedIn, validateReview, reviewController.createReview);

  //DELETE REVIEW ROUTE
  router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.destroyReview);

  module.exports = router;