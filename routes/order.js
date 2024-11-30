const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const { isLoggedin, isAdmin } = require("../middleware");

// // Route to place an order
// router.post("/orders", isLoggedin, async (req, res) => {
//     const { items, totalAmount } = req.body; // Expecting items and total amount from the request
//     const order = new Order({
//         user: req.user._id,
//         items,
//         totalAmount
//     });

//     await order.save();
//     req.flash("success", "Your order has been placed!");
//     res.redirect("/listings");
// });

// router.post('/orders',isLoggedin, async (req, res) => {
//     const { items, totalAmount, phone, paymentId } = req.body;
  
//     const newOrder = new Order({
//       user: req.user._id, // If user is logged in, store user ID
//       items: items,
//       totalAmount: totalAmount,
//       phone: phone,
//       paymentId: paymentId || 'DEFAULT_PAYMENT_ID' // Default for testing
//     });
  
//     try {
//       const savedOrder = await newOrder.save();
      
//       // Optionally, send an invoice via SMS here using a service like Twilio
  
//       res.status(201).json({ orderId: savedOrder._id });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to create order' });
//     }
//   });

// router.post('/orders', async (req, res) => {
//   console.log("Received Order Details:", req.body); // Log the received data

//   // Destructure the order details from the request body
//   const { user, items, totalAmount, phone } = req.body;

//   try {
//       // Check if required fields are present
//       if (!items || !totalAmount || !phone) {
//           return res.status(400).json({ error: "All fields are required." });
//       }

//       // Create a new order instance
//       const newOrder = new Order({
//               user: req.user._id, // If user is logged in, store user ID
//               items: items,
//               totalAmount: totalAmount,
//               phone: phone,
//               paymentId: paymentId || 'DEFAULT_PAYMENT_ID' // Default for testing
//       });

//       // Save the order to the database
//       const savedOrder = await newOrder.save();
      
//       // Respond with the created order ID
//       res.status(201).json({ orderId: savedOrder._id });
//   } catch (error) {
//       console.error("Error creating order:", error);
//       res.status(500).json({ error: "Failed to create order", details: error.message });
//   }
// });
router.post('/orders', async (req, res) => {
  // console.log("Received Order Details:", req.body); // Log the received data

  // Destructure the order details from the request body
  const { user, items, totalAmount, phone, paymentId } = req.body; // Add paymentId here

  try {
      // Check if required fields are present
      if (!items || !totalAmount || !phone) {
          return res.status(400).json({ error: "All fields are required." });
      }

      // Create a new order instance
      const newOrder = new Order({
          user, // Assuming the user is already passed as part of the request body
          items,
          totalAmount,
          phone,
          paymentId: paymentId || 'DEFAULT_PAYMENT_ID' // Use paymentId from request or default value
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();
      
      // Respond with the created order ID
      res.status(201).json({ orderId: savedOrder._id });
  } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order", details: error.message });
  }
});



// // Route to view user's orders
// router.get("/orders", isLoggedin, async (req, res) => {
//     const orders = await Order.find({ user: req.user._id }).populate("user");
//     res.render("orders/userOrders", { orders });
// });
// router.get("/orders", isLoggedin, async (req, res) => {
//     try {
//         const userOrders = await Order.find({ user: req.user._id });
//         res.render("orders/userOrders.ejs", { orders: userOrders });
//     } catch (error) {
//         console.error("Error fetching user orders:", error);
//         req.flash("error", "Unable to fetch your orders.");
//         res.redirect("/listings");
//     }
// });

// router.get("/orders", isLoggedin, async (req, res) => {
//     try {
//         console.log("Current User ID:", req.user._id); // Log user ID from the session
//         const userOrders = await Order.find({ user:req.user._id });
//         res.render("orders/userOrders.ejs", { orders: userOrders });
//     } catch (error) {
//         console.error("Error fetching user orders:", error);
//         req.flash("error", "Unable to fetch your orders.");
//         res.redirect("/listings");
//     }
// });
router.get("/orders", isLoggedin, async (req, res) => {
    try {
        // console.log("Current User ID:", req.user._id);  // Log user ID
        const userOrders = await Order.find({ user: req.user._id });
        // console.log("User Orders:", userOrders);        // Log orders array
        res.render("orders/userOrders.ejs", { orders: userOrders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        req.flash("error", "Unable to fetch your orders.");
        res.redirect("/listings");
    }
});




// Route to view all orders (for admins)
router.get("/adminorders", isAdmin, async (req, res) => {
    
    const orders = await Order.find().populate('user');

    res.render("orders/adminOrders", { orders });
});

module.exports = router;
