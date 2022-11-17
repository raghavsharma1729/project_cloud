import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export const collectionName = 'trips';

const DayDetail = new Schema(
    {
        day: {
            type: Number
        },
        detail: {
            type: String
        }
    },
    {
        _id: false,
        versionKey: false
    }
);

const ImagesDetail = new Schema(
    {
        tag: {
            type: String
        },
        url: {
            type: String
        },
        caption: {
            type: String
        }
    },
    {
        _id: false,
        versionKey: false
    }
);

const TripSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        destinations: {
            type: [String],
            required: true
        },
        fromDate: {
            type: Date
        },
        toDate: {
            type: Date
        },
        cost: {
            type: Number
        },
        members: {
            type: Number
        },
        tripDetails: {
            type: [DayDetail],
            required: true,
        },
        images: {
            type: [ImagesDetail]
        },
        userId: {
            type: ObjectId,
            required: true,
            index: true
        },
        joiners: {
            type: [ObjectId]
        },
        chatLink: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

export const TripModel = mongoose.model(collectionName, TripSchema);
