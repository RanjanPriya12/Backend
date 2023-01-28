const catchAsyncError = require("../middlewares/catchAsyncError");
const Application = require("../models/application.model");

//create new enquiry
exports.newApplication = catchAsyncError(async (req, res, next) => {
  const {
    city,
    state,
    name,
    email,
    phone,
    course
  } = req.body;

  const application = await Application.create({
    city,
    state,
    phone,
    name,
    email,
    course,
  });
  res.status(201).json({
    success: true,
    application
  });
});




// get all enquiries by admin
exports.getAllApplications = catchAsyncError(async (req, res, next) => {
  const applications = await Application.find({}).lean().exec();
  res.status(200).json({
    success: true,
    applications
  });
});


