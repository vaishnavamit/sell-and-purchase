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
    ProductImage:[{
        type: String
    }],
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Date:{
        type:Date,
        default:Date.now
    },
    ProductDetail:{
    type: Schema.Types.Mixed,
    default: {}
    },
    State:{
        type:String,
        required:true
    },
    District:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('product',UserSchema);