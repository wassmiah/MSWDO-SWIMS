const JWT = require('jsonwebtoken');

const AdminMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            return res.status(401).send({
                message: 'Auth Failed: Authorization header missing',
                success: false
            });
        }

        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: 'Auth Failed: Token not found in Authorization header',
                success: false
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: 'Auth Failed: Token verification failed',
                    success: false
                });
            }

            if (decoded.role !== 'admin') {
                return res.status(403).send({
                    message: 'Auth Failed: Admins only',
                    success: false
                });
            }

            req.body.userId = decoded.id;
            next();
        });
    } catch (error) {
        res.status(401).send({
            message: 'Auth Failed',
            success: false
        });
    }
};

module.exports = AdminMiddleware;
