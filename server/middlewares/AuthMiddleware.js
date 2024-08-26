const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Log all incoming request headers
        console.log('Request headers:', req.headers);

        // Check if the Authorization header is present
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            console.error('Authorization header missing');
            return res.status(401).send({
                message: 'Auth Failed: Authorization header missing',
                success: false
            });
        }

        // Split the token from the Bearer prefix
        const tokenParts = authorizationHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            console.error('Invalid Authorization header format');
            return res.status(401).send({
                message: 'Auth Failed: Invalid Authorization header format',
                success: false
            });
        }

        const token = tokenParts[1];
        if (!token) {
            console.error('Token not found in Authorization header');
            return res.status(401).send({
                message: 'Auth Failed: Token not found in Authorization header',
                success: false
            });
        }

        console.log('Received token:', token);

        // Verify the token
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err.message);
                return res.status(401).send({
                    message: 'Auth Failed: Token verification failed',
                    success: false
                });
            }

            console.log('Authentication successful. Decoded token:', decoded);

            // Attach the user information from the token to the request object
            req.user = decoded;
            req.body.userId = decoded.id;

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).send({
            message: 'Auth Failed: Unexpected error occurred',
            success: false
        });
    }
};
