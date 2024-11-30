const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressErrors = require("./utils/ExpressErros.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport")
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")
const Listing = require("./models/listing.js");
const orderRoute = require("./routes/order.js");
// Import your new order routes
app.use(express.json());




const listingRoute = require("./routes/listing.js");

const userRoute = require("./routes/user.js");
const { cookie } = require("express/lib/response.js");

const {isLoggedin ,validateListing,isAdmin} = require("./middleware.js");
const wrapAsync = require("./utils/wrapAsync.js");

const mongo_url = "mongodb://localhost:27017/canteen";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}
//middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions={
    secret: "manojsecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.get("/",(req,res)=>{
    res.send("HI, I AM ROOT ");
});







app.use(session(sessionOptions));
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
    res.locals.isAdmin = req.user && req.user.Admin; // Add isAdmin check
    next();
});


// app.get("/demouser", async(req,res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "test1"
//     });

//     let registeredUser = await User.register(fakeUser,"hello123");
//     res.send(registeredUser);

// });


app.use("/listings",listingRoute);
// app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute);
app.use("/", orderRoute); 
// Use the order routes
// app.use("/cart",(req,res)=>{
//     res.render("\listings/cart.ejs");
// });
// app.use("/bf",(req,res)=>{
//     res.render("\listings/breakfast.ejs");
// });
// app.use("/lunch",(req,res)=>{
//     res.render("\listings/lunch.ejs");
// });
// app.use("/dinner",(req,res)=>{
//     res.render("\listings/dinner.ejs");
// });

app.get('/bf', async (req, res) => {
    try {
        // Assuming you're using Mongoose for MongoDB
        const items = await Listing.find({ description: 'Breakfast' });
        res.render("listings/breakfast.ejs", { items });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items from the database.");
    }
});

app.get('/lunch', async (req, res) => {
    try {
        // Assuming you're using Mongoose for MongoDB
        const items = await Listing.find({ description: 'Lunch' });
        res.render("listings/lunch.ejs", { items });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items from the database.");
    }
});

app.get('/dinner', async (req, res) => {
    try {
        // Assuming you're using Mongoose for MongoDB
        const items = await Listing.find({ description: 'Dinner' });
        res.render("listings/dinner.ejs", { items });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items from the database.");
    }
});

app.get("/cart", isLoggedin, async (req, res) => {
    res.render("\listings/cart.ejs", { currUser: req.user }); // Pass the user object to EJS
});
// app.delete('/listings/:id', async (req, res) => {
//     try {
//         await Item.findByIdAndDelete(req.params.id);
//         res.redirect('/menu');  // Redirect after successful deletion
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error deleting item.');
//     }
// });


// app.use("/add",(req,res)=>{
//     res.render("\listings/additems.ejs");
// });

// app.use("/signup",(req,res)=>{
//     res.render("\listings/signup.ejs");
// });
app.use("/add",isLoggedin,isAdmin,wrapAsync(async(req,res)=>{
    res.render("\listings/additems.ejs");
}));

// app.delete("/:id",isLoggedin,wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     req.flash("success", "Deleted!");
//     res.redirect("/listings");
//   }));

// Route to delete an item
app.delete('/listings/:id',isAdmin, async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        req.flash("success", "Deleted!"); // Deleting the item
        res.redirect('/listings');  // Redirecting to the listings page after deletion
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting item.');
    }
});


  

app.all("*",(req,res,next)=>{
  next(new ExpressErrors(404,"Page not Found!!"));
});
app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong"} = err;
  res.status(statusCode).render("listings/error.ejs", {message});
  // res.status(statusCode).send(message);
});
app.listen(8080,()=>{
    console.log("server is listing");
});
