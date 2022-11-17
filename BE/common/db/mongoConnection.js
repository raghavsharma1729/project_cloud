import pkg from 'mongoose';
const { connect, connection } = pkg;
import logger from '../utils/logger/index.js';



const connectMongo = async () => {
    const dbUri = process.env.MONGO_CONNECTION_URL || '';

    connection.on('error', (err) => {
        logger.error('Mongo DB connection error', err);
    });

    connection.once('error', (error) => {
        logger.info('Mongo DB connection error', error);
    });

    connection.once('open', () => {
        logger.info('Mongo DB connection open');
    });

    connection.on('disconnected', () => {
        logger.error('Mongo DB connection disconnected');
    });

    await connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 120000,
        socketTimeoutMS: 360000,
        connectTimeoutMS: 300000
    });
};

export { connectMongo };