const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const processRoutes = require("./routes/processRoutes");
const materialRoutes = require("./routes/materialRoutes");
const supplierRoutes = require("./routes/supplierRoutes");


// parse cookie
app.use(cookieParser());
// parse json
app.use(express.json());

app.use(cors());
//db connect
const db = require("./models/connection");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/processes", processRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/suppliers", supplierRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("aplikacija pokrenuta 3001");
  });
});
