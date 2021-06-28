import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";

import { ResponseApi } from '../utils/ResponseApi';

const getAuthJwt = () => {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const expiredKey = process.env.JWT_EXPIRED_KEY || '24h';
    const token = jwt.sign({id: Math.random()}, secretKey, {expiresIn: expiredKey});

    return token;
}

const checkAuthJwt = (req: Request, res: Response, next: NextFunction): any => {
    try {
        /** validate request */
        if (!req.headers.authorization) {
            return ResponseApi({res, code:'error', codeType:'0-001', message:'Token is required'});
        }

        /** get token and secret key token */
        const token: string = req.headers.authorization.split(" ")[1];
        const secretKey = process.env.JWT_SECRET_KEY || "secret";

        /** validate token */
        const credential: string | object = jwt.verify(token, secretKey);
        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
    } catch(error) {
        const newToken = getAuthJwt();
        return ResponseApi({res, code:'error', codeType:'0-002', message:'Token invalid', data: {newToken, error}});
    }
}

export {
    getAuthJwt,
    checkAuthJwt
}