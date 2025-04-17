const notFound = (req, res) =>
  res.status(404).json({
    message: "Not Found",
    error: "Not Found",
  });

module.exports = notFound;
