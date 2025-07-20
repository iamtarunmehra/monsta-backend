let jwt = require("jsonwebtoken")
let checkToken = (req, res, next) => {
    let token = (req.headers.authorization).split(" ")[1]
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    if (decoded) {
        req.body.id = decoded._id
        next()
    }
    else {
        res.send({
            status: 0,
            msg: "Invalid token key"
        })
    }

}

module.exports = { checkToken }