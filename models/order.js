const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    items: [{
        title: { type: String, required: true }, // Title of the item
        price: { type: Number, required: true }, // Price of the item
        quantity: { type: Number, required: true, default: 1 } // Quantity of the item
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    phone: { // New field for storing the user's phone number
        type: String,
        required: true
    },
    paymentId: { // New field for storing the Razorpay payment ID
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);
