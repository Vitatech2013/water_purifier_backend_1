const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        saleDate: { type: Date, required: true },
        salePrice: { type: Number, required: true },
        discountPercentage: { type: Number, default: 0 },
        warrantyExpiry: { type: Date },
        services: [
          {
            serviceType: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Service",
              required: true,
            },
            serviceDate: { type: Date, required: true },
            servicePrice: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
