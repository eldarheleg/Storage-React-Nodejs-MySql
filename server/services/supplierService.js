const db = require("../models/connection");
const { Op } = require("sequelize");
const Product = db.product;
const Supplier = db.supplier;

exports.createSupplier = async (req, res) => {
  const { supplierName, jib, pib, phoneNumber, contactPerson, supplierEmail } =
    req.body;
    let transactions = await db.sequelize.transaction();
    const today = new Date();

  //check user existence
  const existSupplier = await Supplier.findOne({
    where: {
      [Op.or]: [{ supplierEmail: supplierEmail }, { jib: jib }, { pib: pib }],
    },
    //transaction: transactions,
  });
  if (!existSupplier) {
    try {
      const newSupplier = await Supplier.create(
        {
          supplierName,
          jib,
          pib,
          phoneNumber,
          contactPerson,
              supplierEmail,
          start_date: today
        },
        { transactions }
      );

      //console.log(newSupplier)
      await transactions.commit();
      res.status(201).json({
        message: "Supplier successfully created",
        supplier: newSupplier.supplierName,
      });
    } catch (error) {
      await transactions.rollback();
      console.error(error.message);
      res.status(500).json({ message: "Internal server error - " + error.message });
    }
  } else {
    await transactions.rollback();
    res.status(500).json({ error: "Supplier already exists" });
  }
};

exports.updateSupplier = async (req, res) => {
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

exports.getSingleSupplier = async (req, res) => {
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

exports.getAllSuppliers = async (req, res) => {
  let suppliers;
  try {
    suppliers = await Supplier.findAll();
    return res.status(200).json({ suppliers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
