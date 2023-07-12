const db = require("../models/connection");
const Supplier = db.supplier;
const Material = db.material;

exports.create = async (req, res) => {
  const {
    materialName,
    quantity,
    minQuantity,
    price,
    unitMeasure,
    inUse,
    supplierName,
  } = req.body;
  
  let transactions = await db.sequelize.transaction();
  const today = new Date();

  //check user existence
  const matchSupplier = await Supplier.findOne({
    where: {
      supplierName: supplierName,
    },
  });

  if (!matchSupplier) res.status(404).json({ error: "Supplier not found" });

  const existMaterial = await Material.findOne({
    where: {
      materialName: materialName,
    },
  });

  if (!existMaterial) {
    try {
      const newMaterial = await Material.create(
        {
          materialName,
          quantity,
          minQuantity,
          price,
          unitMeasure,
          inUse,
          supplierId: matchSupplier.id,
        },
        { transaction: transactions }
      );

      await transactions.commit();
      res.status(201).json({
        message: "Material successfully created",
        material: newMaterial.materialName,
        supplierName: matchSupplier.supplierName
      });
    } catch (error) {
      await transactions.rollback();
      res.status(500).json({
        message: "Internal server error",
      });
    }
  } else {
    await transactions.rollback();
    res.status(500).json({ error: "Material already exist" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let transactions = await db.sequelize.transaction();
  try {
    const found = await Material.findByPk(id);
    if (!found)
      return res.status(400).json({ message: "Material does not exist." });
    const updated = await Material.update(
      data,
      { where: { id: id } },
      { transactions }
    );
    await transactions.commit();
    return res.status(201).json({ updated });
  } catch (error) {
    console.log(error);
    await transactions.rollback();
    return res.status(400).json({ message: error.message });
  }
};

exports.getSingle = async (req, res) => {
  const id = req.params.id;
  let material;
  try {
    material = await Material.findByPk(id);
  } catch (err) {
    return console.log(err);
  }
  if (!material) {
    return res.status(404).json({ message: "No material found" });
  }
  return res.status(200).json({ material });
};

exports.getAll = async (req, res) => {
  let materials;
  try {
    materials = await Material.findAll();
    return res.status(200).json({ materials });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
