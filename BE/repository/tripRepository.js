import pkg from "lodash";
import { TripModel } from "./model/trip.js";
import { ObjectId } from 'mongodb';


const { isEmpty, isUndefined, omitBy } = pkg;

const convertTripDocumentToObject = (document) =>
    document.toObject({
        getters: true,
        versionKey: false,
        transform: (doc, ret) => ({
            ...ret,
            userId: ret.userId && ret.userId.toString()
        })
    });

const convertTripsToArray = (documents) =>
    documents.map(convertTripDocumentToObject);

const create = async (trip) => {
    const result = await TripModel.create(trip);
    return result && convertTripDocumentToObject(result);
};

const getById = async (id) => {
    const aggregationPipeLine = getAggregationPipeLine({ _id: new ObjectId(id) })
    // const result = await TripModel.findOne({ id });
    const result = await TripModel.aggregate(aggregationPipeLine);
    // return result && convertTripDocumentToObject(result);
    return result.length > 0 ? result[0] : {};
};

const arrayRegex = (arr) => {
    return arr.map((value) => {
        return new RegExp(value, "i")
    })
}

const fetchFilterOptions = (filter) => {
    if (isEmpty(filter.places) && isEmpty(filter.startDate) && isEmpty(filter.endDate)) {
        return {};
    }
    else if (isEmpty(filter.places)) {
        return { fromDate: { $gte: filter.startDate, $lte: filter.endDate } };
    }
    else if (isEmpty(filter.startDate) && isEmpty(filter.endDate)) {
        const placesRegex = arrayRegex(filter.places);
        return { destinations: { $in: placesRegex } };
    }
    else {
        const placesRegex = arrayRegex(filter.places);
        return {
            $and: [
                { destinations: { $in: placesRegex } },
                { fromDate: { $gte: new Date(filter.startDate), $lte: new Date(filter.endDate) } }
            ]
        }
    }

};

const filter = async (filters) => {
    const filterOption = fetchFilterOptions(filters);
    const aggregationPipeLine = getAggregationPipeLine(filterOption)
    // const result = await TripModel.find(filterOption);
    const result = await TripModel.aggregate(aggregationPipeLine);
    // return result && convertTripsToArray(result);
    return result;
}

const update = async (trip) => {
    const result = await TripModel.findOneAndUpdate(
        {
            _id: new ObjectId(trip.id)
        },
        { $set: omitBy(trip, isUndefined) },
        {
            new: true,
            runValidators: true,
        }
    );

    return result && convertTripDocumentToObject(result);
}

const joinRequest = async (tripId, user) => {
    return await TripModel.updateOne(
        {
            _id: new ObjectId(tripId)
        },
        { $addToSet: { joiners: new ObjectId(user.id) } }
    );
}

const findTripsofUser = async (userId) => {
    const aggregationPipeLine = getAggregationPipeLine({ userId: new ObjectId(userId) });
    // const trips = await TripModel.find({ userId: new ObjectId(userId) });
    const trips = await TripModel.aggregate(aggregationPipeLine);
    // return trips && convertTripsToArray(trips);
    return trips;
}

const fetchJoinedTrips = async (userId) => {
    const aggregationPipeLine = getAggregationPipeLine({ joiners: new ObjectId(userId) });
    // const trips = await TripModel.find({ joiners: new ObjectId(userId) });
    const trips = await TripModel.aggregate(aggregationPipeLine);
    // return trips && convertTripsToArray(trips);
    return trips;
}


const getAggregationPipeLine = (condition) => {
    return [
        {
            '$match':
                condition
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'creator'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'joiners',
                'foreignField': '_id',
                'as': 'joinee'
            }
        }
    ]
}

const tripRepository = { create, getById, filter, update, joinRequest, findTripsofUser, fetchJoinedTrips };

export default tripRepository;