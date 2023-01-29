const express = require("express");
const {
  newApplication,
  getAllApplications
} = require("../controllers/application.controller");
const router = express.Router();

router.route("/apply").post(newApplication);
router.route("/admin/applicants").get(getAllApplications);

module.exports = router;