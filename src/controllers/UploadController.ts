import { NextFunction, Request, Response } from 'express';
import fileupload from "express-fileupload";
import path from "path";

import {ResponseApi,ResponseServerErrorApi} from '../utils/ResponseApi';
import {checkExistFileDirectory, createFileDirectory, moveFile} from '../utils/Storage';
import { removeCharFromString } from '../utils/FormattedData';

const storeFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.files ? req.files.file as fileupload.UploadedFile : null;
        const { uuid, content } = req.body;

        /** validate request */
        if(!file) {
            return ResponseApi({res, code:'error', codeType:'0', message:'File is required'});
        }
        if(!content) {
            return ResponseApi({res, code:'error', codeType:'0', message:'Content is required'});
        }

        /** get path file */
        const basePathUploadFile = process.env.BASE_PATH_UPLOAD_FILE || 'contents/files';
        let pathUploadFile = `${basePathUploadFile}/${content}`;
        if(uuid) {
            pathUploadFile = `${pathUploadFile}/${uuid}`;
        }

        /** Check and create directory upload file*/
        const publicPathUploadFile = `public/${pathUploadFile}`;
        const checkPublicPathUploadFile = checkExistFileDirectory(publicPathUploadFile);
        if (! checkPublicPathUploadFile) {
            createFileDirectory(publicPathUploadFile);
        }

        /** generate filename */
        const randomFileName = Math.floor(Math.random()*999999999) + 1;
        const fileName = removeCharFromString((randomFileName + '_' + file.name), [' ']);

        /** store file into server */
        const serverFileDirectory = path.join(__dirname+ '../../../public', pathUploadFile);
        const oriFileName = `ori_${fileName}`;
        const pathOriFileName = `${serverFileDirectory}/${oriFileName}`;
        const moveOriFileName = moveFile(file, pathOriFileName);
        if(moveOriFileName) {
            const data = {
                filepath: `${pathUploadFile}/${oriFileName}`
            };

            return ResponseApi({res, code:'success', codeType:'1', message:'Store file successfully', data});
        }

        return ResponseApi({res, code:'error', codeType:'0', message:'Store file failed'});
    } catch (error) {
        console.log('error', error)
        return ResponseServerErrorApi({res, data: {error}});
    }
};

export default {
    storeFile
};