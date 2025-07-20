// routes/product.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all products
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM Products");
  res.json(rows);
});

// GET product by ID
router.get("/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM Products WHERE ProductID = ?", [
    req.params.id,
  ]);
  res.json(rows[0]);
});

// CREATE new product
router.post("/", async (req, res) => {
  const { ProductName, Price, Stock } = req.body;
  const [result] = await db.query(
    "INSERT INTO Products (ProductName, Price, Stock) VALUES (?, ?, ?)",
    [ProductName, Price, Stock]
  );
  res.json({ id: result.insertId, ProductName, Price, Stock });
});

// UPDATE product
router.put("/:id", async (req, res) => {
  const { ProductName, Price, Stock } = req.body;
  await db.query(
    "UPDATE Products SET ProductName = ?, Price = ?, Stock = ? WHERE ProductID = ?",
    [ProductName, Price, Stock, req.params.id]
  );
  res.json({ id: req.params.id, ProductName, Price, Stock });
});

// DELETE product
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM Products WHERE ProductID = ?", [req.params.id]);
  res.json({ message: "Product deleted" });
});

module.exports = router;
