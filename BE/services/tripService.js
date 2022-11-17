import { ERROR_CODE } from "../common/enums/errorCode.js";
import { AppError } from "../common/utils/error/AppError.js";
import tripRepository from "../repository/tripRepository.js";

const create = async (trip) => {
    const result = await tripRepository.create(trip);
    return result;
};

const getById = async (tripId) => {
    const result = await tripRepository.getById(tripId);
    return result;
};

const filter = async (filters) => {
    const result = await tripRepository.filter(filters);
    return result;
};

const update = async (trip, user) => {
    const tripDetails = await tripRepository.getById(trip.id);
    if (user.admin || user.id == tripDetails.userId) {
        const result = await tripRepository.update(trip);
        return result;
    }
    else {
        throw new AppError(ERROR_CODE.FORBIDDEN);
    }
};

const joinRequest = async (tripId, user) => {
    await tripRepository.joinRequest(tripId, user);
    const trip = await tripRepository.getById(tripId)
    return trip;
};

const findTripsofUser = async (user) => {
    const trips = await tripRepository.findTripsofUser(user.id);
    return trips;
}

const fetchJoinedTrips = async (user) => {
    const trips = await tripRepository.fetchJoinedTrips(user.id);
    return trips;
}

const tripService = { create, getById, filter, update, joinRequest, findTripsofUser, fetchJoinedTrips };

export default tripService