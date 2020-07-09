const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KantoRegionSchema = new Schema(
  {},
  { collection: "KantoRegion" },
  { strict: false }
);

module.exports = KantoRegion = mongoose.model("KantoRegion", KantoRegionSchema);
