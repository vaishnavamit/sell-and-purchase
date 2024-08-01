const mongoose=require('mongoose');
const { distinct } = require('./User');
const {Schema}=mongoose;
const locationSchema=new Schema({
    District:{
        type:String,
        require:true
    },
    State:{
        type:String,
        require:true
    }
})
module.exports=new mongoose.model('location', locationSchema);