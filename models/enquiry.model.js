const mongoose=require('mongoose');


const enquireySchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true},
    state:{type:String,required:true},
    phone:{type:Number,required:true},
    city:{type:String,required:true},
},{
  versionKey:false,
  timestamps:true
});


const Enquiry=new mongoose.model('enquiries',enquireySchema);
module.exports=Enquiry;