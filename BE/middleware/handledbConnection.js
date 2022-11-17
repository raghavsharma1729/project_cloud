import { connectMongo } from '../common/db/mongoConnection.js';
export const handleDbConnection = async (
    request,
    response,
    next
) => {
    if (process.env.environment !== 'test') {
        await connectMongo();
    }
    next();
};
