const router = require("express").Router();
const Order = require("../models/Order");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req,res)=>{

    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder);
    }
    catch(error){
        res.status(500).json(error);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedOrder);
    }catch(error){
        res.status(500).json(error);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.body.id);
        res.status(204).json("Order has been deleted");
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET USER ORDERS
router.get("/:userId", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json(error);        
    }
});

//GET ALL ORDERS OF ALL USERS
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json(error);        
    }
});

module.exports = router;