const Listing = require("./models/listing.js");

const ExpressErrors = require("./utils/ExpressErros.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const { model } = require("mongoose");


module.exports.isLoggedin = (req , res, next) => {
    if(!req.isAuthenticated()){
        //redirect info
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must login!");
        return res.redirect("/login");
      }
      next();
};
// Middleware to check if user is authenticated and an admin
module.exports.isAdmin=(req, res, next) => {
  if (req.isAuthenticated() && req.user.Admin) {
      return next();
  }
  req.flash("You Must be Admin to Delete")
  res.redirect("/login"); // or show an error message
};

module.exports.saveRedirectUrl = (req,res,next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl
  }
  next();
};


module.exports.isOwner = async(req,res,next) =>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You Don't have permission to update");
    return res.redirect(`/listings/${id}`);
  }
  next();
};


module.exports.validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body); 
  
  if (error) {
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressErrors(400, result,errMsg)
    
  }else{
    next();
  }
};

module.exports.validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body); 
  
  if (error) {
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressErrors(400, result,errMsg)
    
  }else{
    next();
  }
};

module.exports.isReviewAuthor = async(req,res,next) =>{
  let { id , reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You can't delete this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};





