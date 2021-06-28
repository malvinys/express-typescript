import { Response } from 'express';

interface IResponseServerErrorApi {
    res: Response,
    data: {
        error: any
    },
}

export default IResponseServerErrorApi;