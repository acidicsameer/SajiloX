import Product from "../../models/Product.model.js";
import Review from "../../models/Review.model.js";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    const ProductReviews = await Review.find(req.params._id).populate("UserId");
    if (product.length == 0) {
      return res.status(400).json({
        message: "No product Avaiable ",
        data: {
          product:[], 
          ProductReviews:[]
        }
      });
    }
    res.status(200).json({
      message: "fetched product successfully",
      data:{
        product,
      ProductReviews,
    }
    });
  } catch (error) {
    res.status(500).json({
      message: "cannot get product",
      data: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  // const id =req.params._id
  // console.log(id)

  const data = await Product.findById(req.params._id);

  console.log(data);
  if (!data) {
    return res.json({
      message: "No Product found by provided id  ",
    });
  }
  res.status(200).json({
    message: "Product Found on Provided id ",
    data: data,
  });
};
export const trendingProducts=async(req,res)=>{
   const data =await Review.find({Rating:{$gt:3}}).populate({
    path: "ProductId",

  });
   if(data.length==0){
    res.json({
      message:"no popular products "
    })
   }

 const details = data.filter(element => element.ProductId);


    res.status(200).json({
      message:"successfully fetched trending products ", 
     details
    })
}