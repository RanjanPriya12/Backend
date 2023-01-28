const express = require("express");
const {
  newApplication,
  getAllApplications
} = require("../controllers/application.controller");
const { isAuthenticate, isAuthorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/apply").post(isAuthenticate,newApplication);
router.route("/admin/applicants").get(isAuthenticate, isAuthorizeRoles("admin"), getAllApplications);

module.exports = router;