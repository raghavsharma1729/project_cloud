import logger from '../common/utils/logger/index.js';

export const handleLogs = (
    request,
    response,
    next
) => {
    logger.info({
        method: request.method,
        body: request.body,
        params: request.param,
        url: request.url
    });
    next();
};

