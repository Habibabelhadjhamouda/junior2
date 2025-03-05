const {Category}=require ("../models/index")
module.exports = {
  getAllcategory: async (req, res) => {
    try{
      const category= await Category.findAll()
      res.send(category)
    }catch(error){
      res.status(500).send(error)
    }
    
    
  },

  addcategory: async (req, res) => {
     const {CategoryName}=req.body
    try{
     
     const newcategory= await Category.create({CategoryName})
     res.status(201).send({
       success: "category is created succefully",
       category: newcategory,
     });
     
    }catch (error) {
     throw error;
   }
   }
}


