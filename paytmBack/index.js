require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// console.log("secret =>", process.env.JWT_SECRET);

const userRouter = require("./routes/user");
// console.log(userRouter);
const paymentRouter = require("./routes/payment");
// console.log(paymentRouter);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);

// Handle invalid routes
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(3000, () => console.log("✅ Server running on port 3000"));
