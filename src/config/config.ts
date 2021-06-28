import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'DEV';
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT_PROD = process.env.SERVER_PORT_PROD || 8080;
const SERVER_PORT_DEV = process.env.SERVER_PORT_DEV || 8080;
const SERVER_PORT = NODE_ENV === 'DEV' ? SERVER_PORT_DEV : SERVER_PORT_PROD;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER
};

export default config;