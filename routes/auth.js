const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
// const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

// -------------------REGISTER----------------------
router.post("/register", async (req,res) => {
    const newUser = new User(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password, 
                process.env.PASS_SECRET
            ).toString()
        }
    );
    console.log(newUser)
     
    try{
        const savedUser = await newUser.save()
        console.log(savedUser)
        res.status(201).json(savedUser);
    } 
    catch(err){
        console.log(err)
        res.status(500).json(err);
    } 
})

// ----------------------GENERATE TOKEN ---------------------
const generateAccessToken = (user) => { return jwt.sign({
    id: user._id,
    isAdmin: user.isAdmin
}, 
    process.env.JWT_SECRET,
    {expiresIn:"3d"}
)};


// ------------------LOGIN------------------
router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({
                username: req.body.username
            });
        !user && res.status(401).json("wrong credentials")

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SECRET
            );
            const Ori_Password = hashedPassword.toString(CryptoJS.enc.Utf8);

        Ori_Password !== req.body.password && res.status(401).json("wrong credentials")

        const accessToken = generateAccessToken(user);
       

        // Not to send password to after login
        const {password, ...others} = user._doc;

        // res.status(200).json({...others, accessToken, refreshToken})
        res.status(200).json({...others, accessToken})
    } catch(err) {
        res.status(500).json(err)
    }
})


// ---------------LOGOUT------------------
// router.post("/logout", verifyToken, async (req,res) => {
//     const refreshToken = req.body.token;
//     refreshTokens = refreshTokens.filter(token => token !== refreshToken);
//     res.status(200).json("Logged out successfully");
// })



module.exports = router