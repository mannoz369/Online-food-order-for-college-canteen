const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin , isOwner ,isAdmin,validateListing} = require("../middleware.js");




//index route
router.get("/", wrapAsync(async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("\listings/index.ejs",{allListings});
}));




  //Create Route
  router.post("/",isLoggedin,isAdmin,validateListing,wrapAsync(async (req, res,next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Item added!");
    res.redirect("/listings");
 })
 );


//Delete Route
// router.delete("/:id",isLoggedin,wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   req.flash("success", "Deleted!");
//   res.redirect("/listings");
// }));

module.exports = router;