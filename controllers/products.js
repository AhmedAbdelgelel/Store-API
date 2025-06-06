const Product = require("../models/product");
const audit = require("../audit/audit");
const ApiError = require("../middleware/apiError");
const errorStatus = require("../middleware/errorStatus");
const ErrorType = require("../middleware/errorType");
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  await audit.prepareAudit("READ", "admin", "getAllProductsStatic", false);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const products = await result;
  await audit.prepareAudit("READ", "user", "products", false, queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

// basic endpoint for testing
const getProductDemo = (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    return next(
      new ApiError(
        ErrorType.API_ERROR,
        errorStatus.Bad_Request,
        "Please provide name",
        true
      )
    );
  } else {
    res.send(`<h1>Hello ${name}</h1>`);
  }
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
  getProductDemo,
};
