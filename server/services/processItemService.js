const db = require("../models/connection");
const material = require("../models/material");
const Product = db.product;
const Process = db.process;
const ProcessItem = db.processItem;
const Material = db.material

exports.create = async (req, res) => {
  const { amount, materialId } = req.body;
  let transactions = await db.sequelize.transaction();
  try {
    const newProcessItem = await ProcessItem.create(
      {
        amount,
        materialId,
      },
      { transactions }
    );
      await transactions.commit();
      res.status(201).json({
        message: "ProcessItem successfully created",
        processItem: newProcessItem,
      });
  } catch (error) {
    await transactions.rollback();
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
  let processItem;
  try {
    processItem = await ProcessItem.findByPk(id,{include: Material});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (!processItem) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json({ processItem });
};

exports.getAll = async (req, res) => {
  let processItems;
  try {
    processItems = await ProcessItem.findAll({include: Material});
    return res.status(200).json({ processItems });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
