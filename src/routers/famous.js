const express = require("express");
const {
  getFamous,
  getSpecificFamous,
  createFamous,
  updateFamous,
  deleteFamous
} = require("../controllers/famous");
const router = express.Router();

//all '/'
router.route("/").get(getFamous).post(createFamous);

// all '/:ID'
router
  .route("/:ID")
  .get(getSpecificFamous)
  .put(updateFamous)
  .delete(deleteFamous);

//for app.js
module.exports = router;
