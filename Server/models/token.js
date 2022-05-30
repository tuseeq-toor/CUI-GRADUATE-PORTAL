const mongoose = require("mongoose");
const schema = mongoose.Schema;

const tokenSchema = new schema({
  token: { type: String, expires: "10m" },
  email: { type: String, expires: "10m" },
});
module.exports = mongoose.model("Token", tokenSchema);
