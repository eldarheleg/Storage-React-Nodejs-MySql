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
const processItemRoutes = require("./routes/processItemRoutes")


// parse json
app.use(express.json());
// parse cookie
app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//db connect
const db = require("./models/connection");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/processItems", processItemRoutes);
app.use("/api/processes", processRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/suppliers", supplierRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("aplikacija pokrenuta 3001");
  });
});
