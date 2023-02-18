const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: {
      lat: Number,
      lgn: Number,
    },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { collection: "branch", timestamps: true ,toJSON:{virtual:true}}
);

branchSchema.virtual("branchProduct",{
    ref: 'Product',    
    localField: '_id', 
    foreignField: 'branch',
})

const branch = mongoose.model("Branch", branchSchema);

module.exports = branch;
