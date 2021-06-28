import { NextFunction, Request, Response } from 'express';

import {ResponseApi, ResponseServerErrorApi} from '../utils/ResponseApi';
import {getAuthJwt} from '../middleware/AuthMiddleware';

const getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = getAuthJwt();

        if(token) {
            return ResponseApi({res, code:'success', codeType:'1', message:'get Token successfully', data: {token}});
        }

        return ResponseApi({res, code:'error', codeType:'0', message:'get Token failed'});
    } catch (error) {
        return ResponseServerErrorApi({res, data: {error}});
    }
};

export default {
    getToken
};