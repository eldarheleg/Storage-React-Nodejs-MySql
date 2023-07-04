const db = require("../models/connection");
const Product = db.product
const Process = db.process

exports.createProduct = async (req, res) => {
  const { name, picUrl, profitMargin, process } = req.body;
  let transactions = await db.sequelize.transaction();
  try {
    const findProcess = await Process.findByPk(process);
    if (findProcess) {
      const newProduct = new Product({
        name,
        picUrl,
        profitMargin,
        processId: process,
      },{transactions});
    } else {
        console.log("process not found")
        return res.status(500).json({ message: "process not found" });
    }
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.body.price)
      return res
        .status(400)
        .json({ message: "You can't change price of product." });
    const updatedItem = await Product.findByIdAndUpdate(
      req.params.id,
      req.params.body
    );
    if (!updatedItem)
      return res.status(400).json({ message: "Item does not exist." });
    return res.status(201).json({ updatedItem });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  const id = req.params.id;
  let product1;
  try {
    product1 = await Product.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!product1) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json({ product1 });
};

exports.getAllProducts = async (req, res) => {
  let products;
  try {
    products = await Product.find();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
