const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(500).json(error);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.body.id);
        res.status(204).json("User has been deleted");
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET BY ID
router.get("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const user = await User.findById(req.body.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET USER ORDERS
router.get("/:userId/orders", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET ALL ORDERS OF ALL USERS
router.get("/orders", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET USER CART BY ID
router.get("/:userId/carts", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET ALL CARTS OF ALL USERS
router.get("/carts", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(error){
        res.status(500).json(error);        
    }
});

module.exports = router;