const db = require("../models/connection");
const Product = db.product;
const Process = db.process;

exports.create = async (req, res) => {
  const { processName, end_date, start_date, processItemId, processItem } =
    req.body;
  let transactions = await db.sequelize.transaction();

  const processExist = await Process.findOne({
    where: { processName: processName },
  });
  if (!processExist) {
    try {
      const newProcess = await Process.create(
        {
          processName,
          end_date,
          start_date,
          processPrice: processItem.material.price * processItem.amount,
          processItemId: processItemId,
        },
        { transaction: transactions }
      );

      await transactions.commit();
      res.status(201).json({
        message: "Process successfully created",
        process: newProcess,
      });
    } catch (error) {
      await transactions.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(500).json({ error: "Process already exists" });
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
  let process;
  try {
    process = await Process.findByPk(id);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (!process) {
    return res.status(404).json({ message: "No process found" });
  }
  return res.status(200).json({ process });
};

exports.getAll = async (req, res) => {
  let processes;
  try {
    processes = await Process.findAll();
    return res.status(200).json({ processes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
