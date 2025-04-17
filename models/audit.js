const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["CREATE", "UPDATE", "DELETE", "READ"],
    },
    auditBy: {
      type: String,
    },
    auditData: {
      type: String,
    },
    error: {
      type: Boolean,
      default: false,
    },
    changes: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audit", auditSchema);
