const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    name: { type: String, require: true, trim: true },
    gender: { type: String },
    email: { type: String },
    position: { type: String },
    salary: { type: Number },
  },
  { collection: "staffs" }
);

const staff = mongoose.model("Staff", staffSchema);

module.exports = staff;
