const express = require("express");
require("dotenv").config();
require("./src/scripts/sync");
const route = require("./src/routes");

const app = express();
const port = process.env.PORT || 3000; #port3000

app.use(express.json());
app.use("/api", route);
app.use("/", (req, res) => {
  return res.json("Welcome to this application.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
