const express=require("express")
const Router=express.Router()
const{ getAllcategory,addcategory}=require("../Controller/Categories.controller")





Router.get("/get", getAllcategory)
Router.post("/add",addcategory)










module.exports=Router