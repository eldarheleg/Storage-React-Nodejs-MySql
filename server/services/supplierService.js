const db = require("../models/connection");
const { Op } = require("sequelize");
const Supplier = db.supplier;

exports.create = async (req, res) => {
  const { supplierName, jib, pib, phoneNumber, contactPerson, supplierEmail } =
    req.body;
  let transactions = await db.sequelize.transaction();
  const today = new Date();

  //check user existence
  const existSupplier = await Supplier.findOne({
    where: {
      [Op.or]: [{ supplierEmail: supplierEmail }, { jib: jib }, { pib: pib }],
    },
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
          start_date: today,
        },
        { transaction: transactions }
      );

      await transactions.commit();
      res.status(201).json({
        message: "Supplier successfully created",
        supplier: newSupplier.supplierName,
      });
    } catch (error) {
      await transactions.rollback();
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ error: "Supplier already exists" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let transactions = await db.sequelize.transaction();
  try {
    const found = await Supplier.findByPk(id);
    if (!found)
      return res.status(400).json({ message: "Supplier does not exist." });
    const updated = await Supplier.update(
      data,
      { where: { id: id } },
      { transaction: transactions }
    );
    await transactions.commit();
    return res.status(201).json({ updated });
  } catch (error) {
    await transactions.rollback();
    return res.status(400).json({ message: error.message });
  }
};

exports.getSingle = async (req, res) => {
  const id = req.params.id;
  let supplier;
  try {
    supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "No supplier found" });
    }
    return res.status(200).json({ supplier });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  let suppliers;
  try {
    suppliers = await Supplier.findAll();
    return res.status(200).json({ suppliers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
