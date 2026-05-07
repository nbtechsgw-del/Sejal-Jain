import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: [String],   
  category: String,
  subCategory: String,
  description: String,
  sizes: [String],
  bestseller: Boolean,
  stock: Number
});

const Product = mongoose.model("Product", productSchema);

export default Product;