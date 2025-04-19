const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
  getProductDemo,
} = require("../controllers/products");
router.get("/demo", getProductDemo);
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
