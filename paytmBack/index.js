require('dotenv').config();
// load env variables first of all
const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const mongoUrl = process.env.MONGO_URI;
// console.log(mongoUrl);
// to debug whether env virable is working correctly

const userRouter = require("./routes/user");

const paymentRouter = require("./routes/payment");


app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);



// Handle invalid routes
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

async function main() {
    await mongo.connect(mongoUrl);
    app.listen(3000, () => console.log("✅ Server running on port 3000"));

    // add mongo path
}
main();

