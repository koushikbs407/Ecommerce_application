const JWT = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('Authorization');
    if(!token) return res.status(401).send("Access denied. No token provided");
    try{
        const decoded = JWT.verify(token, "jwtPrivateKey");
        req.user = decoded;
        ///console.log(decoded);
        next();
    }catch(err){
        res.status(400).send("Invalid token");
    }

}