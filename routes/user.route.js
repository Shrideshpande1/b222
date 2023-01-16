const express = require('express');
const { UserModel } = require('../models/user.model');
const bcrypt=require("bcrypt");
const userRoutes=express.Router()
const jwt=require("jsonwebtoken")

//register
userRoutes.post("/register",async(req,res,next)=>{
    const {email,pass,name,age}=req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
           if(err){
            console.log(err)
           }else{
            const user=new UserModel({email,pass:hash,name,age})
            await user.save()
            res.send("Registed")
           }
        });
    } catch (error) {
        console.log(error);
        res.send({ error: "Someting went wrong" });
      }
})

//Login
userRoutes.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
           bcrypt.compare(pass,user[0].pass,(err,result)=>{
            if(result){
                const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                res.send({"msg":"Login successful",token})
            } else{
                res.send("Wrong credentials")
              }

           }) 
        }else{
            res.send("wrong credentils")
           }
        
    } catch (error) {
        res.send("Someting went wrong")
        console.log(error.message)
    }
})


userRoutes.get("/",async(req,res,next)=>{
    let query=req.query;
    try {
        const user=await UserModel.find(query)
        res.send(user)
        res.send("All the notes");
    } catch (error) {
        console.log(error);
        res.send({ error: "Someting went wrong" });
      }
})

userRoutes.patch("/update/:id",async(req,res,next)=>{
    const ID=req.params.id;
    const payload=req.body
    try {
        await UserModel.findByIdAndUpdate({_id:ID},payload)
        res.send("user updated successfully");
    }catch (error) {
        console.log(error);
        res.send({ error: "Someting went wrong" });
      }
})

userRoutes.delete("/delete/:id",async(req,res,next)=>{
    const ID=req.params.id;
   
    try {
        await UserModel.findByIdAndDelete({_id:ID})
        res.send("user deleted successfully");
    }catch (error) {
        console.log(error);
        res.send({ error: "Someting went wrong" });
      }
})

module.exports={userRoutes}