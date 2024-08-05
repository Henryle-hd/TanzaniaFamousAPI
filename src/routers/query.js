const express = require("express");
const { queryFamous } = require("../controllers/query");
const router = express.Router();

//query famous
router.get("/", queryFamous);
module.exports = router;
