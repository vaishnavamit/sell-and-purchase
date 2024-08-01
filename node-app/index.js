const express=require('express')
const app = express();
const cors = require('cors');
const port = 4000;
const mongoDB=require("./db");
const path=require('path');
mongoDB();
// Use CORS middleware
app.use(cors());
// Enable pre-flight for all routes
app.options('*', cors());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api',require('./Routes/endPoints'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})