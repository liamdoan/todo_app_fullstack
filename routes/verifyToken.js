const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if(err) res.status(403).json("token isn't valid!");
            req.user = user;
            next();
        });
    }else { 
        return res.status(401).json("Not authenticated")
    }
};

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id) {
            next()
        } else {
            res.status(403).json("Access is not allowed!")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization}
