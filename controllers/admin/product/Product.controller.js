 import Product from "../../../models/Product.model.js";


   const CreateProduct=async (req,res)=>{

 
     const {ProductName,ProductPrice,ProductDescription,ProductStockQty,ProductStatus}=req.body
    if(!ProductName || !ProductDescription || !ProductPrice || !ProductStockQty|| !ProductStatus ) {
         return res.json({
             "message":"Provide all the details required "
         })
    }
     const data= await Product.create({
         ProductName,
         ProductDescription,
         ProductPrice,
         ProductStockQty
    }  )
  res.json({
        "message ":"Product Added successfully",
        "data":data
    })

   
   
    }
 export default CreateProduct