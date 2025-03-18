const express = require("express");
const app = express();
app.use(express.json());


const mainRouter = require("./routes/");
app.use("/api/v1", mainRouter);

