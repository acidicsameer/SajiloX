import Product from "../../../models/Product.model.js";
 import fs from 'fs'
export const CreateProduct = async (req, res) => {
  try {
    console.log(req.file);
    // if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Provide an image file" });
    }

    const {
      ProductName,
      ProductPrice,
      ProductDescription,
      ProductStockQty,
      ProductStatus,
    } = req.body;

    // Validate other fields
    if (
      !ProductName ||
      !ProductDescription ||
      !ProductPrice ||
      !ProductStockQty ||
      !ProductStatus
    ) {
      return res
        .status(400)
        .json({ message: "Provide all the details required" });
    }

    const data = await Product.create({
      ProductName,
      ProductDescription,
      ProductPrice,
      ProductStockQty,
      ProductStatus,
      ProductImage: req.file.path,
    });

    res.json({
      message: "Product Added successfully",
      data: data,
      filePath: req.file.path,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const data = await Product.find({});
    if (data.length == 0) {
      return res.status(400).json({
        message: "No product Avaiable ",
      });
    }
    res.status(200).json({
      message: "get All  product Successfully",
      data: data,
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
export const DeleteProduct = async (req, res) => {   
  

  const data = await Product.findByIdAndDelete(req.params._id); 
  if (!data) {
    return res.status(400).json({
      message: "No user found on provided id ",
    });
  } 
  const OldImagePath=data.ProductImage 
  fs.unlink(OldImagePath, (err)=>{
  if(err)
  {
     console.log("error while deleting file from file system ")
  } 
  else { 

  res.status(200).json({
    message: "Successfully deleted id and file from fs ",
  });
  }
})
  
};


export const UpdateProduct = async (req, res) => {
  try {
    const {
      ProductName,
      ProductPrice,
      ProductDescription,
      ProductStockQty,
      ProductStatus,
    } = req.body;

    const data = await Product.findById(req.params._id);

    if (!data) {
      return res.status(400).json({
        message: "No product found on this id",
      });
    }

    const OldImage = data.ProductImage;

    // ✅ If new image uploaded
    if (req.file && req.file.path) {
      fs.unlink(OldImage, (err) => {
        if (err) {
          console.log("error while deleting file from file system");
        }
      });

      await Product.findByIdAndUpdate(req.params._id, {
        ProductName,
        ProductPrice,
        ProductDescription,
        ProductStockQty,
        ProductStatus,
        ProductImage: req.file.path,
      });

      return res.json({
        message: "successfully updated with new image",
      });
    }

    // ✅ If NO image uploaded (important!)
    await Product.findByIdAndUpdate(req.params._id, {
      ProductName,
      ProductPrice,
      ProductDescription,
      ProductStockQty,
      ProductStatus,
    });

    res.json({
      message: "successfully updated without image",
    });

  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};




