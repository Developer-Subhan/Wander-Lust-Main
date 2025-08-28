const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res, next) => {
  try {
    res.render("users/signup.ejs");
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, async (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome ${registeredUser.username}!`);
      res.redirect("/listing");
    });

  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/listing");
  }
};

module.exports.renderLoginForm = (req, res, next) => {
  try {
    res.render("users/login.ejs");
  } catch (err) {
    next(err);
  }
};

module.exports.loginUser =   async (req, res, next) => {
    try {
      let user = await User.findOne({ username: req.body.username });
      req.flash("success",`Welcom back ${user.username}!`);
      let redirectUrl = res.locals.redirectUrl || "/listing";
      res.redirect(redirectUrl);
    } catch (err) {
      next(err);
    }
  };

module.exports.logoutUser = (req, res, next)=>{
  req.logOut((err)=>{
    if(err){
      return next(err)
    }
    req.flash("success","You are logged out!");
    res.redirect("/listing");
  })
};