const mongoose = require('mongoose');
const Schema= mongoose.Schema

const penSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    address: {
      province: String,
    }
  },{collection:"setting"});

const company = mongoose.model("Companys" , companySchema);

module.exports = company;
