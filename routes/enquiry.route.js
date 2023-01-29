const express = require("express");
const {
  newEnquiry,
  getAllEnquiries
} = require("../controllers/enquiry.controller");
const { isAuthenticate, isAuthorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/newEnquiry").post(newEnquiry);
router.route("/admin/enquiries").get(getAllEnquiries);

module.exports = router;