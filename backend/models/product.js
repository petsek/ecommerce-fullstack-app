
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    feature1: { type: String, required: true },
    feature2: { type: String, required: true },
    feature3: { type: String, required: true },
    feature4: { type: String, required: true },
    longDesc: { type: String, required: true }
  }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;