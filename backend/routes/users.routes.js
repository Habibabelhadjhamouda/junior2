const express=require("express")
const Router=express.Router()
const {register,login,currentUser}=require("../Controller/user.controller")

Router.post("/login", login);

Router.post("/register", register);
Router.get("/getUser", currentUser);

module.exports=Router