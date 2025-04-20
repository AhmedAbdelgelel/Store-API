const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(`Error occurred: ${err.name || "Unknown error"}`);
  console.log(err.stack || err);

  if (err.name === "API_ERROR") {
    return res.status(err.statusCode || 400).json({
      msg: "Missing required name parameter",
    });
  }

  const statusCode = err.statusCode || 500;
  return res
    .status(statusCode)
    .json({ msg: err.message || "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
