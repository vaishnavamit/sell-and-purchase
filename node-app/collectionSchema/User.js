const mongoose=require("mongoose");
const {Schema}=mongoose;
const UserSchema=new Schema({
    name :{
        type : String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    likedProducts: [{type:mongoose.Schema.Types.ObjectId, ref:'product'}]
})
module.exports=mongoose.model('user',UserSchema);