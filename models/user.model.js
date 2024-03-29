const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    first_Name: {
      type: String,
      required: [true, "Please Enter Your First Name"],
      maxLength: [15, "first name cannot exceed 15 characters"],
      minLength: [3, "first name is too small"],
    },
    last_Name: {
      type: String,
      required: [true, "Please Enter Your Last Name"],
      maxLength: [15, "last name cannot exceed 15 characters"],
      minLength: [2, "last name is too small"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Sorry Email is Not Valid"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },{
    timestamps:true,
    versionKey:false
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Compare pass
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  //reset pass
  userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
  };


const User= new mongoose.model('user', userSchema);
module.exports=User;