import { Response } from 'express';

interface IResponseApi {
    res: Response,
    statusCode?: number,
    code: string,
    codeType: string,
    message: string,
    data?: any
}

export default IResponseApi;