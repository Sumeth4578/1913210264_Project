const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    district: { type: String },
  },
  { collection: "branch", timestamps: true, toJSON: { virtual: true } }
);

branchSchema.virtual("branchProduct", {
  ref: "Product",
  localField: "_id",
  foreignField: "branch",
});

const branch = mongoose.model("Branch", branchSchema);

module.exports = branch;
