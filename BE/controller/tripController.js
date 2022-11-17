import http from "../common/enums/http.js";
import { wrapAsync } from "../common/utils/error/wrapAsync.js";
import tripService from "../services/tripService.js";
import { ObjectId } from 'mongodb';
import pkg from 'lodash';
import { request } from "express";
const { isEmpty } = pkg;


const create = async (request, response) => {
    const {
        title,
        description,
        destinations,
        fromDate,
        toDate,
        cost,
        images,
        members,
        tripDetails,
        user,
        chatLink
    } = request.body;
    const trip = {
        title,
        destinations,
        description,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        cost,
        images,
        members,
        tripDetails,
        userId: user?.id || new ObjectId(),
        joiners: [],
        chatLink
    };
    const createTrip = await tripService.create(trip);
    response.status(http.StatusCode.CREATED).json(createTrip);
};

const getById = async (request, response) => {
    const tripId = request.params.trip_id;
    const tripDetails = await tripService.getById(tripId);
    response.status(http.StatusCode.OK).json(tripDetails);
}

const findTrips = async (request, response) => {
    const { places, startDate, endDate } = request.query;
    console.log({ places, startDate, endDate });
    const filters = {
        places: Array.isArray(places) ? places : [places],
        startDate,
        endDate
    }
    const trips = await tripService.filter(filters);
    response.status(http.StatusCode.OK).json(trips);
}

const update = async (request, response) => {
    const {
        title,
        description,
        destinations,
        fromDate,
        toDate,
        cost,
        images,
        members,
        tripDetails,
        user
    } = request.body;
    const tripId = request.params.trip_id;

    const trip = {
        id: tripId,
        title,
        destinations,
        description,
        fromDate: isEmpty(fromDate) ? undefined : new Date(fromDate),
        toDate: isEmpty(toDate) ? undefined : new Date(toDate),
        cost,
        images,
        members,
        tripDetails,
    };
    const updatedTrip = await tripService.update(trip, user);
    response.status(http.StatusCode.CREATED).json(updatedTrip);
};

const joinRequest = async (request, response) => {
    const tripId = request.params.trip_id;
    const user = request.body.user;
    const updatedTrip = await tripService.joinRequest(tripId, user);
    response.status(http.StatusCode.CREATED).json(updatedTrip);
}

const tripController = wrapAsync({
    create,
    getById,
    findTrips,
    update,
    joinRequest
});


export default tripController;