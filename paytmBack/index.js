require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());


// const mainRouter = require("./routes/");


const { userRouter } = require("./routes/user")
const { paymentRouter } = require("./routes/payment")


app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);

app.listen(3000);

