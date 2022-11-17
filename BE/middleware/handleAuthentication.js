import pkg from 'lodash';
import { ERROR_CODE } from '../common/enums/errorCode.js';
import { AppError } from "../common/utils/error/AppError.js";
import jwt from "../common/utils/jwt/index.js";
const { isEmpty, get } = pkg;

const extractToken = (headers) => {
    const authHeader = get(headers, 'authorization', undefined);
    return authHeader && authHeader.split(' ')[1];
};

export const handleAuthentication = async (request, response, next) => {
    const token = extractToken(request.headers);
    if (isEmpty(token)) {
        next(new AppError(ERROR_CODE.UNAUTHORIZED));
    }
    try {
        const payload = await jwt.decodeJWT(token);
        if (isEmpty(payload.data)) {
            next(new AppError(ERROR_CODE.UNAUTHORIZED));
        }
        request.body.user = payload.data;
    }
    catch (e) {
        next(new AppError(ERROR_CODE.UNAUTHORIZED));
    }
    next();
}

export const handleAuthenticationForAdmin = async (request, response, next) => {
    const token = extractToken(request.headers);
    if (isEmpty(token)) {
        next(new AppError(ERROR_CODE.UNAUTHORIZED));
    }
    try {
        const payload = await jwt.decodeJWT(token);
        if (isEmpty(payload.data)) {
            next(new AppError(ERROR_CODE.UNAUTHORIZED));
        }
        if (!payload.data.admin) {
            next(new AppError(ERROR_CODE.UNAUTHORIZED));
        }
        request.body.user = payload.data;
    }
    catch (e) {
        next(new AppError(ERROR_CODE.UNAUTHORIZED));
    }
    next();
}