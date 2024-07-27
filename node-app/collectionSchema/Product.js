const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema=new Schema({
    ProductCategory:{
        type: String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    ProductDescription:{
        type:String
    },
    ProductPrice:{
        type:Number,
        required:true
    },
    ProductImage:{
        type:String,
        required:true
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})
module.exports=mongoose.model('product',UserSchema);