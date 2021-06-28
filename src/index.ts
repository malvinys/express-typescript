import http from 'http';
import express from 'express';
import fileupload from "express-fileupload";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import config from './config/config';
import logging from './config/logging';

import { checkAuthJwt } from './middleware/AuthMiddleware';

/** import Routes */
import UploadRoutes from "./routes/UploadRoutes";
import TokenRoutes from "./routes/TokenRoutes";

const app = express();

/** Server Handling */
const httpServer = http.createServer(app);

/** Log the request */
app.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());

/** Rules of our API */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
app.use(express.static('public'));
app.use('/api/v1/token', TokenRoutes);
app.use('/api/v1/upload', checkAuthJwt, UploadRoutes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(config.server.port, () => logging.info(`Server is running ${config.server.hostname}:${config.server.port}`));
