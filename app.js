const express=require('express');
require('dotenv').config();
const app=express();
var cors = require('cors')
const PORT=process.env.APP_PORT;
const userRouter=require('./api/users/user.router');

app.use(cors())
app.use(express.json());
//EndPoint
app.get("/api",(req,res,next)=>{
    res.json({
        success:1,
        message:'This is rest api working'
    })
});

//user router
app.use('/api/',userRouter);
app.listen(PORT,()=>{
    console.log(`Server runing on PORT ${PORT}`);
})


