const express = require("express");
const router = express.Router();
const {
  runJobCostData,
  getJobCostData,

} = require("../controllers/getDataController");
const basicAuth = require("../middleware/auth");
const { reqValidate } = require("../requestValidator");

router.post("/runJobCostData", basicAuth, runJobCostData);

router.get("/getJobCostData", basicAuth, reqValidate, getJobCostData);

module.exports = router;
