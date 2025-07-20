// server.js
const express = require("express");
const app = express();
const productRoutes = require("./routes/product");
require("dotenv").config();

app.use(express.json());

app.use("/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
