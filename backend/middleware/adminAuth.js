const jwt = require("jsonwebtoken");

const adminAuth = async(req, res, next) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) {
            return res.status(401).json({ msg: "No auth token, access denied" });
        }

        const verified = jwt.verify(token, "tokenSecretKey");
        //console.log(jwt.verify(token,"passwordKey"))
        if (!verified)
            return res
                .status(401)
                .json({ msg: "Token verification failed, authorization denied." });


        req.dokan = verified.dokan;
        req.token = token;

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = adminAuth;