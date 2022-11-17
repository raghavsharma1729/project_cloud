import userRepository from "../repository/userRepository.js";
import pkg from 'lodash';
import { AppError } from "../common/utils/error/AppError.js";
import { ERROR_CODE } from "../common/enums/errorCode.js";
import jwt from "../common/utils/jwt/index.js";
import tripService from "./tripService.js";
import { sendEmail } from "../repository/awsRepository.js";
import userVerificationRepository from "../repository/userVerificationRepository.js";
import { v4 as uuidv4 } from 'uuid';


const { isEmpty } = pkg;

const create = async (user) => {
    const profilePictureLink = `${process.env.CLOUD_FRONT_URL}/${user.profilePicture}`;
    const createdUser = await userRepository.create({ ...user, profilePicture: profilePictureLink });
    const userVerification = { token: uuidv4(), userId: createdUser.id };
    const createdUserVerification = await userVerificationRepository.create(userVerification);
    const url = `${process.env.FRONT_BASE_URL}/user/${createdUserVerification.token}`;
    // Enable to send email notification
    sendEmail(createdUser, url);
    return createdUser;
};

const login = async (email, password) => {
    const user = await userRepository.findUserByEmailAndPassword(email, password);
    if (isEmpty(user)) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }
    const token = jwt.signJWT(user);
    return { token, user };
}

const fetchProfile = async (user) => {
    const result = await userService.getById(user.id);
    return result;
};

const verify = async (token) => {
    const userVerification = await userVerificationRepository.findByToken(token);
    console.log('service userVerification', userVerification)
    if (isEmpty(userVerification)) {
        throw new AppError(ERROR_CODE.INVALID_REQUEST)
    }
    const user = await userRepository.updateVerification(userVerification.userId);
    await userVerificationRepository.findAndDelete(userVerification);
    return user;
};

const fetchTrips = async (user) => {
    const trips = await tripService.findTripsofUser(user);
    return trips;
}

const fetchJoinedTrips = async (user) => {
    const trips = await tripService.fetchJoinedTrips(user);
    return trips;
}

const getById = async (userId) => {
    const user = await userRepository.findUserById(userId);
    const tripsCreated = await fetchTrips(user);
    const tripsJoined = await fetchJoinedTrips(user);
    return { ...user, tripsCreated: tripsCreated.length, tripsJoined: tripsJoined.length };
};

const userService = { create, login, fetchProfile, getById, fetchTrips, fetchJoinedTrips, verify };

export default userService