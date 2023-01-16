const express=require('express');
const {connections}=require("./config/db");
const { noteRoute } = require('./routes/note.routes');
const { userRoutes } = require('./routes/user.route');

const app=express();

app.use(express.json());

//routes
app.use("/note",noteRoute)
app.use("/users",userRoutes)


app.listen(3000,async(req,res,next)=>{
    try {
        await connections
        console.log("Connected to db")
    } catch (error) {
        console.log("Troublle to connectiong to DB")
        console.log(err)
    }
    console.log("running server 3000")
})