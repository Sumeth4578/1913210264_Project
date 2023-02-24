const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    type: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    color: { type: String },
    branch: { type: Schema.Types.ObjectId, required: true, ref: "Branch" },
  },
  {
    collection: "products",
  }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
