import Product from "../../../models/Product.model.js";
import User from "../../../models/User.model.js";

export const AddToCart = async (req, res) => {
  const UserId = req.user.id;
  const ProductId = req.params.id;
  console.log(UserId, ProductId);
  const Userdata = await User.findById(UserId);

  if (!Userdata) {
    return res.json({
      message: "user doesnot exists",
    });
  }
  const ProductExist = await Product.findById(ProductId);
  if (!ProductExist) {
    return res.status(404).json({
      message: "No product exists on provided id ",
    });
  }
  Userdata.Cart.push(ProductId);
  await Userdata.save();
  res.status(200).json({
    message: "Product added successfully on respective UserId",
  });
};
export const getCartItems = async (req, res) => {
  const UserId = req.user.id;
  const Userdata = await User.findById(UserId).populate("Cart");
  if (!Userdata) {
    return res.status(403).json({
      message: "No user exist on Provided id ",
    });
  }
  const cartitems = Userdata.Cart;
  const data = await Product.find({ _id: { $in: cartitems } }); // cartitems ma _id xa vaney teslai dekhauney array of object ma
  if (cartitems.length == 0) {
    return res.json({
      message: "No items in the cart",
      data: [],
    });
  }
  res.json({
    message: "fetched Cart items successfully",
    data: data,
  });
};
export const deleteCartItems = async (req, res) => {
  const UserId = req.user.id;
  const ProductId = req.params.id;

  const ProductExists = await Product.findById(ProductId);
  if (!ProductExists) {
    return res.json({
      message: "Product doesnot exists",
    });
  }
  const Userdata = await User.findById(UserId);
  if (!Userdata) {
    return res.json({
      message: "No User found ",
    });
  } 


   Userdata.Cart= await Userdata.Cart.filter((id)=>id!=ProductId)  
   //Userdata.Cart contains only product id which is not equal to provided id 
   // due to this while calling cart/id the provided id erased 
 await Userdata.save()
 
   res.status(200).json({
    message:"Succesfully deleted item from the cart"
   })

 
  
};
