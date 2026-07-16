import jwt from 'jsonwebtoken';

const isSecureCookie = process.env.FRONTEND_URL?.startsWith("https://");

const appAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // Tell the frontend it can try refreshing
                return res.status(401).json({
                    success: false,
                    code: 'TOKEN_EXPIRED',
                    message: 'Access token expired'
                });
            }

            return res.status(401).json({
                success: false,
                message: 'Unauthorized — invalid token'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error in appAuthMiddleware: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket?.handshake?.auth?.token;

        if (!token) {
            return next(new Error('Authentication error: Access token not found'));
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return next(new Error('Authentication error: Access token expired'));
            }
            return next(new Error('Authentication error: Invalid token'));
        }

        socket.user = decoded;
        next();
    } catch (error) {
        console.log("Error in socketAuthMiddleware: ", error);
        return next(new Error('Authentication error: Internal server error'));
    }
}

export { appAuthMiddleware, socketAuthMiddleware };
