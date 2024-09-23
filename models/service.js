const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    servicePrice: { type: Number, required: true },
    serviceDescription: { type: String, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner", // Link to Owner model
      required: true,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" }, // Active/inactive status
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
