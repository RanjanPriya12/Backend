const mongoose=require('mongoose');


const applicationSchema=new mongoose.Schema({
    course:{type:String, required:true},
    name:{type:String, required:true},
    email:{type:String,required:true},
    state:{type:String,required:true},
    phone:{type:Number,required:true},
    city:{type:String,required:true},
},{
  versionKey:false,
  timestamps:true
});


const Application=new mongoose.model('application',applicationSchema);
module.exports=Application;