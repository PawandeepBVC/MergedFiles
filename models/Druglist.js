const mongoose = require("mongoose");

const DruglistSchema = mongoose.Schema({
  drug: {
    type: Array,
    required: true,
  },
  alternateName: {
    type: Array,
    required: false,
  },
  catagory: {
    type: String,
    required: true,
  },
  subCatagory: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("druglist", DruglistSchema);
