import Order from "../../../models/Order.model.js"
  // this is for admin to see all the orders of the users 
 const getAllOrder=async(req,res)=>{
    const data= await Order.find().populate({
        path:"items.product",  
        model:"Product"

    }) 
    if(data.length==0){
        return res.json({
            message:"failed to fetch orders"
        })
    }
       res.status(200).json({
            message:"successfully fetched all the orders of  users  ", 
            data:data
        })
} 
export default getAllOrder