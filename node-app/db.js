const mongoose=require("mongoose");
const URI="mongodb+srv://vaishnavamit905:1NFrLpchYc2gYp39@cluster0.wmphrks.mongodb.net/myolxmern?retryWrites=true&w=majority&appName=Cluster0"
const mongoDB=async()=>{
    try{
    await mongoose.connect(URI);
    const readyState=mongoose.connection.readyState;
    if(readyState){
        console.log("connected with mongoDB");
        const db=mongoose.connection.db;
        return db;
    }
    else{
        console.log("connection not established");
    }
}
    catch(error){
        console.error("Error connecting to mongoDB",error.message)
    }
};
module.exports=mongoDB;