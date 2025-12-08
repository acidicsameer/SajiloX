import Product from "../../../models/Product.model.js";

const CreateProduct = async (req, res) => {
  try { 
    console.log(req.file)
    // if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Provide an image file" });
    }

    const { ProductName, ProductPrice, ProductDescription, ProductStockQty, ProductStatus } = req.body;

    // Validate other fields
    if (!ProductName || !ProductDescription || !ProductPrice || !ProductStockQty || !ProductStatus) {
      return res.status(400).json({ message: "Provide all the details required" });
    }
 
  
    const data = await Product.create({
      ProductName,
      ProductDescription,
      ProductPrice,
      ProductStockQty,
      ProductStatus,
      ProductImage:req.file.path
    });

    res.json({
      "message": "Product Added successfully",
      "data": data ,
      "filePath":req.file.path
    }); 


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export default CreateProduct;
