const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

//! Create Product

app.post("/api/v1/product/new", async (req, resp) => {
  const product = await Product.create(req.body);

  resp.status(201).json({
    success: true,
    product,
  });
});

//! Read Product
app.get("/api/v1/products", async (req, resp) => {
  const products = await Product.find();

  resp.status(200).json({
    success: true,
    products,
  });
});

//! Update Product

app.put("/api/v1/product/:id", async (req, resp) => {
  let product = await Product.findById(req.params.id);

  if(!product){
   return resp.status(404).json({
      success: false,
      message: "Product not found",
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  resp.status(200).json({
    success: true,
    product,
  });
});

//! Delete Product
app.delete("/api/v1/product/:id", async (req, resp) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return resp.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();

  resp.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

app.listen(4500, () => {
  console.log("server is working http://localhost:4500");
});
