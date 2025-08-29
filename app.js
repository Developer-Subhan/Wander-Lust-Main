if(process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRoutor = require("./routes/listing.js");
const reviewRoutor = require("./routes/review.js")
const userRoutor = require("./routes/user.js")

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl = process.env.ATLASDB_URL
main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error", (e)=>{
console.log("Error in mongo store",e);
})

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  }
};




app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});







app.get("/", (req, res) => {
  res.redirect("/listing");
});


app.use("/listing", listingRoutor);
app.use("/listing/:id/review", reviewRoutor);
app.use("/", userRoutor);
app.get("/test", (req, res) => {
  res.send("Updates are working fine");
});


// PAGE NOT FOUND
app.use("/", (req, res, next) => {
  res.render("notfound.ejs");
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err)
  let { status = 500, message = "Some error occured" } = err;
  if(message == "Cannot read properties of undefined (reading 'geometry')") {
    message = "Invalid Location";
  }
  res.status(status).render("error.ejs", { message });
});



app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
