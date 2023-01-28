const catchAsyncError = require("../middlewares/catchAsyncError");
const Enquiry = require("../models/enquiry.model");

//create new enquiry
exports.newEnquiry = catchAsyncError(async (req, res, next) => {
  const {
    city,
    state,
    name,
    email,
    phone
  } = req.body;

  const enquiry = await Enquiry.create({
    city,
    state,
    phone,
    name,
    email,
  });
  res.status(201).json({
    success: true,
    enquiry,
  });
});




// get all enquiries by admin
exports.getAllEnquiries = catchAsyncError(async (req, res, next) => {
  const enquiries = await Enquiry.find({}).lean().exec();
  res.status(200).json({
    success: true,
    enquiries,
  });
});


