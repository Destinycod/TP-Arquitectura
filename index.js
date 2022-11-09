const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = 3000;
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

mongoose.connect(
    "mongodb+srv://claraema7:Claraema1717@ecommercetparqweb.xaaj4yo.mongodb.net/shop?retryWrites=true&w=majority"
)
.then(()=> console.log("DB connection successfull"))
.catch((error)=>{
    console.log(error);
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});