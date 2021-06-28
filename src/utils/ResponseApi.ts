import IResponseApi from '../interfaces/IResponseApi';
import IResponseServerErrorApi from '../interfaces/IResponseServerErrorApi';

const ResponseApi = (params: IResponseApi) => {
    const {res, statusCode=200, code, codeType, message, data=null} = params;

    return res.status(statusCode).send ({code, codeType, message, data});
}

const ResponseServerErrorApi = (params: IResponseServerErrorApi) => {
    const {res, data} = params;
    const code = 'error';
    const codeType = '0-500';
    const message = 'Oops, something error. Please try again or contact administrator.';

    return ResponseApi({res, code, codeType, message, data});
}

export {
    ResponseApi,
    ResponseServerErrorApi
};
