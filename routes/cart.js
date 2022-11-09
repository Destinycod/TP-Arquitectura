const router = require("express").Router();
const Cart = require("../models/Cart");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req,res)=>{

    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(201).send(savedCart);
    }
    catch(error){
        res.status(500).json(error);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedCart);
    }catch(error){
        res.status(500).json(error);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.body.id);
        res.status(204).json("Cart has been deleted");
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET USER CART BY ID
router.get("/:userId", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET ALL CARTS OF ALL USERS
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(error){
        res.status(500).json(error);        
    }
});

module.exports = router;