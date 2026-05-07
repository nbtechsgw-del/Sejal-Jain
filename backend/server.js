// import express from 'express'
// import cors from 'cors'
// import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import User from './models/User.js'
// import Product from "./models/Product.js";

// const app=express()
// app.use(cors())
// app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("Server working ");
// });


// mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
// .then(()=>console.log("DB connected"))
// .catch(err=>console.log(err))


// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.json({ message: "User registered successfully" });

//   } catch (error) {
//     console.log(error);
//     res.json({ message: "Error in register" });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
// const user = await User.findOne({ email }); // ✅ FIXED
    

//     if (!user) {
//       return res.json({ message: "user not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({ message: "wrong password" });
//     }

//     const token = jwt.sign(
//   { id: user._id, role: user.role },
//   "secretkey"
// );

//     return res.json({
//       message: "Login successful",
//       token
//     });

//   } catch (error) {
//   console.log("🔥 LOGIN ERROR FULL:", error);
//   console.log("🔥 STACK:", error.stack);
//   return res.status(500).json({ error: error.message });
// }

// });


// app.get("/products", async (req,res)=>{

//    console.log(" /products hit hua");
//   try{
//     const products=await Product.find();
//     res.json(products);
//     } catch(error){
//       res.status(500).json({message: "Error fetching products"})

//     }
// });







// app.listen(5000, () => { 
//   console.log("Server running on port 5000"); 
// });


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import Cart from "./models/Cart.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(" REQUEST AAYA:", req.url);
  next();
});

//  DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

mongoose.connection.once("open", () => {
  console.log(" Connected DB:", mongoose.connection.name);
  console.log(" DB NAME:", mongoose.connection.db.databaseName);
});

//  TEST
app.get("/", (req, res) => {
  res.send("SERVER RUNNING ✅");
});

//  PRODUCTS FROM DB
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    console.log(" PRODUCTS FROM DB:", products);
    console.log(" ALL PRODUCTS RAW:");
    console.log(products);
    console.log(" COUNT:", products.length);

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get("/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    console.log("CART FROM DB:", cart);

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});