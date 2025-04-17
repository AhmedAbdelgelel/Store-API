const EventEmitter = require("events");
const Audit = require("../models/audit");

const emitter = new EventEmitter();

exports.prepareAudit = async function (
  action,
  auditBy,
  auditData,
  error = false,
  changes = {}
) {
  const auditObj = {
    action: action,
    auditBy: auditBy,
    auditData: auditData,
    error: error,
    changes: changes,
  };
  if (action && auditBy) {
    try {
      // Save the audit object to the database
      const audit = new Audit(auditObj);
      await audit.save();
      // Emit the audit event
      emitter.emit("audit", auditObj);
    } catch (err) {
      console.error("Error saving audit log:", err);
    }
  }
};

emitter.on("audit", function (auditObj) {
  console.log("Audit log successfully in the database:", auditObj);
});
