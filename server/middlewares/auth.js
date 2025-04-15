const jwt = require('jsonwebtoken');

function auth(req, res, next){

    const token = req.cookies.task_token;

    //check if is there any token or not
    if(!token){
        return res.status(401).json({
            message: 'Invalid access, no token found'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JSON_WEB_SECRET);
        req.user = decoded;

        return next();
    }
    catch(err){
        return res.status(403).json({
            message: 'Unauthorized route'
        })
    }
}

module.exports = auth;
