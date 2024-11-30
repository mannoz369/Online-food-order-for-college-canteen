# Online Food Order for College Canteen

## Overview

The **Online Food Order for College Canteen** is a web-based application designed to simplify the process of food ordering for students and staff in a college campus. The platform allows users to browse a menu, place orders, and make payments seamlessly. The system includes an easy-to-use interface for students to order their food and an admin interface for managing orders and menu items.

---

## Features

- **User Features:**
  - Browse through the college canteen's menu.
  - Add items to the cart and place an order.
  - Select delivery or pick-up option.
  - View order history and track current orders.
  - Secure online payment integration.

- **Admin Features:**
  - Manage menu items (add, update, delete).
  - View and manage incoming orders.
  - View and download invoices for each order.

---

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - React.js for the interactive user interface
  - Bootstrap for responsive design

- **Backend:**
  - Node.js and Express for server-side logic
  - MongoDB for the database to store user data, orders, and menu items
  - JWT (JSON Web Tokens) for secure authentication

- **Payment Integration:**
  - Integrated a payment gateway (e.g., Stripe, Razorpay) for online payments.

---

## Installation

### Prerequisites:
- Node.js and npm
- MongoDB database
- A payment gateway account (e.g., Razorpay, Stripe)

### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Online-food-order-for-college-canteen.git
   cd Online-food-order-for-college-canteen
   ```

2. **Install dependencies:**


3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory and configure the following variables:
     - `MONGO_URI`: MongoDB connection string.
     - `JWT_SECRET`: Secret key for JWT authentication.
     - Payment gateway credentials (e.g., `RAZORPAY_KEY`, `RAZORPAY_SECRET`).

4. **Start the application:**
 

5. Open the app in your browser:

---

## Usage

1. **For Users:**
   - Register an account or log in.
   - Browse the menu, select food items, and add them to your cart.
   - Proceed to checkout, choose delivery/pick-up, and make the payment.
   - Track the status of your orders.

2. **For Admins:**
   - Log in to the admin dashboard.
   - Add or update menu items.
   - View incoming orders and manage them.
   - Generate invoices for orders.

---

## Contributing

We welcome contributions! If you'd like to improve this project, feel free to fork the repository, make changes, and submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Razorpay](https://razorpay.com/) for payment gateway integration.
- [MongoDB](https://www.mongodb.com/) for database management.
- [React.js](https://reactjs.org/) for building the user interface.
- [Node.js](https://nodejs.org/) for the backend server.
