const jwt = require('jsonwebtoken');
const JWT_SECRET = "abra_ka_dabra_gilli_gilli_shoo"
const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" });
    }

}

module.exports = fetchUser;