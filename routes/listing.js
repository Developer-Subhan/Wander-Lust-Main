const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(listingController.index)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    listingController.createListing
  );
//NEW ROUTE
router.get("/search", listingController.searchListings);
router.get("/toprated", listingController.topRatedListings);
router.get("/filter", listingController.filter);
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
  .route("/:id")
  .get(listingController.showListing)
  .patch(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    listingController.updateListing
  )
  .delete(isLoggedIn, isOwner, listingController.destroyListing);
  
//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);




module.exports = router;
