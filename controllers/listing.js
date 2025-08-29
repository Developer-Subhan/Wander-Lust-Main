const { Query } = require("mongoose");
const Listing = require("../models/listing");
const { createGeocoderApi } = require("../utils/geoCods");

module.exports.index = async (req, res, next) => {
  try {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
  } catch (err) {
    next(err);
  }
};
module.exports.renderNewForm = (req, res) => {
  try {
    res.render("listing/new.ejs");
  } catch (err) {
    next(err);
  }
};

module.exports.showListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listing");
    }
    console.log(listing);
    res.render("listing/show.ejs", { listing });
  } catch (err) {
    next(err);
  }
};

module.exports.createListing = async (req, res, next) => {
  try {
    // Geocoding
    const geocoderApi = createGeocoderApi();
    console.log(req.body.listing.location);

    // Call the geocoder safely
    const result = await geocoderApi.forwardGeocode(req.body.listing.location);

    // Use first feature if exists, otherwise fallback coordinates
    let coordinates;
    if (result.features && result.features.length > 0) {
      coordinates = result.features[0].geometry.coordinates;
    } else {
      console.warn(`Location not found: ${req.body.listing.location}. Using default coordinates.`);
      coordinates = [72.5714, 33.6844]; // fallback coordinates (example: Islamabad)
    }

    // Prepare new listing
    let url = req.file?.path;
    let filename = req.file?.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    if (url && filename) {
      newListing.image = { url, filename };
    }

    // Save geometry safely
    newListing.geometry = {
      type: 'Point',
      coordinates
    };

    const savedListing = await newListing.save();
    console.log(savedListing);

    req.flash("success", "New Listing Created Successfully");
    res.redirect(`/listing`);
  } catch (err) {
    next(err);
  }
};

module.exports.renderEditForm = async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listing");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listing/edit.ejs", { listing, originalImageUrl });
  } catch (err) {
    next(err);
  }
};

module.exports.updateListing = async (req, res, next) => {
  try {
    const geocoderApi = createGeocoderApi();
    console.log(req.body.listing.location);
    const result = await geocoderApi.forwardGeocode(req.body.listing.location);
    console.log(result.features[0].geometry.coordinates);

    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
    }

    
    listing.geometry = result.features[0].geometry;
    listing = await listing.save();
    req.flash("success", " Listing Edited Successfully");
    res.redirect(`/listing/${id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.destroyListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", " Listing Deleted Successfully");
    res.redirect("/listing");
  } catch (err) {
    next(err);
  }
};


module.exports.searchListings = async (req, res, next) => {
  const query = req.query.q || "";
  try {
    const allListing = await Listing.find({
        $or: [
    { location: { $regex: query, $options: "i" } },
    { title: { $regex: query, $options: "i" } },
    { description: { $regex: query, $options: "i" } },
    { country: { $regex: query, $options: "i" } },
    { category: { $regex: query, $options: "i" } }
  ]
    });
    if(allListing.length === 0){
      return res.render("./notfound.ejs");
    }

    res.render("listing/index.ejs", { allListing, query });
  } catch (err) {
    next(err);
  }
};




module.exports.topRatedListings = async (req, res, next) => {
  try {
    const allListing = await Listing.aggregate([
      // Join reviews collection
      {
        $lookup: {
          from: "reviews",             // collection name in MongoDB
          localField: "reviews",       // field in Listing
          foreignField: "_id",         // field in Review
          as: "reviewsData"
        }
      },
      // Add avgRating field
      {
        $addFields: {
          avgRating: { $avg: "$reviewsData.rating" }
        }
      },
      // Sort by avgRating descending
      {
        $sort: { avgRating: -1 }
      },
      // Limit to top 3
      {
        $limit: 3
      }
    ]);

    res.render("listing/index.ejs", { allListing });
  } catch (err) {
    next(err);
  }
};


module.exports.filter = async (req, res, next) => {
  const query = req.query.q || "";

  try {
    console.log(query);
    const allListing = await Listing.find({

     category:  { $regex: query, $options: "i" }

    });
    console.log(allListing);
    if(allListing.length === 0){
      return res.render("./notfound.ejs");
    }

    res.render("listing/index.ejs", { allListing, query });
  } catch (err) {
    next(err);
  }
};