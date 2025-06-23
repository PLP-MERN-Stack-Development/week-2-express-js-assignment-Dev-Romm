const express = require("express");
const { v4: uuidv4 } = require("uuid");

module.exports = (products, validateProduct) => {
  const router = express.Router();
  // Routes

  // Root route
  router.get("/", (req, res) => {
    res.send(
      "Welcome to the Product API! Go to /api/products to see all products."
    );
  });

  // GET /api/products - Get all products with filtering and pagination
  router.get("/api/products", (req, res) => {
    let result = products;

    // Filtering by category
    if (req.query.category) {
      result = result.filter((p) => p.category === req.query.category);
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || result.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = result.slice(startIndex, endIndex);

    res.json({
      total: result.length,
      page,
      limit,
      products: paginated,
    });
  });

  // GET /api/products/search?name=... - Search products by name
  router.get("/api/products/search", (req, res) => {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide a name to search." });
    }
    const matches = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(matches);
  });

  // GET /api/products/stats - Get product statistics (count by category)
  router.get("/api/products/stats", (req, res) => {
    const stats = {};
    products.forEach((p) => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    res.json(stats);
  });

  // GET /api/products/:id - Get a specific product
  router.get("/api/products/:id", (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
  // POST /api/products - Create a new product
  router.post("/api/products", validateProduct, (req, res) => {
    const newProduct = {
      id: uuidv4(),
      ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });
  // PUT /api/products/:id - Update a product
  router.put("/api/products/:id", validateProduct, (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (product) {
      Object.assign(product, req.body);
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
  // DELETE /api/products/:id - Delete a product
  router.delete("/api/products/:id", (req, res) => {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
      products.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  return router;
};
