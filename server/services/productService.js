const db = require("../models/connection");
const Product = db.product;
const Process = db.process;

exports.create = async (req, res) => {
  const { productName, productImage, profitMargin, productPrice, processId } =
    req.body;
  
  let transactions = await db.sequelize.transaction();

  const processExist = await Process.findOne({
    where: { id: processId },
  });

  if (processExist) {
    try {
      const newProduct = await Product.create(
        {
          productName,
          productImage,
          productPrice: productPrice / (1 - profitMargin),
          profitMargin,
          processId: processId,
        },
        { transaction: transactions }
      );
      await transactions.commit();
      res.status(201).json({
        message: "Process successfully created",
        product: newProduct,
      });
    } catch (error) {
      await transactions.rollback();
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Process with that id doesn't exist!" });
  }
};

exports.update = async (req, res) => {
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

exports.getSingle = async (req, res) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json({ product });
};

exports.getAll = async (req, res) => {
  let products;
  try {
    products = await Product.findAll();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
