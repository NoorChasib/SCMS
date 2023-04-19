const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const landingRouter = require("./src/routes/landing");

app.use(bodyParser.json());

app.use("/", landingRouter);

app.listen(3000, () => console.log("Server started on port 3000"));
