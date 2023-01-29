const express=require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require('./configs/db');
require('dotenv').config();
const cors = require("cors");
const userRoute = require("./routes/user.route");
const enquiryRoute = require("./routes/enquiry.route");
const applicationRoute = require("./routes/application.route");

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/", (req, res) => {
    res.send(`<h2>Welcome to Internative coding School</h2>`);
  });
  
 
app.use('/internative/user',userRoute);
app.use("/internative/enquiry", enquiryRoute);
app.use("/internative/course", applicationRoute);

const port = process.env.PORT || 8080;
app.listen(port, async() => {
    try {
        await connectDB();
    } catch (error) {
        console.log("err",error);
    }
  console.log(`Express Server is runnning at :  http://localhost:${port}`);
});