const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res)=>{
    const newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try{
        await newUser.save();
        res.status(201).send(req.body);
    }
    catch(error){
        //if(username.empty) do somenthing
        res.status(500).json(error);
        
    }
});

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong credentials");

        const userPassword = user.password;
        userPassword !== req.body.password && res.status(401).json("Wrong password");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
        
    }
});


module.exports = router;

//guardo el usuario, pero como puede demorar bastante lo hago asincronico
