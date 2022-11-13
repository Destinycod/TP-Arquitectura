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



module.exports = router;