import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';


export const collectionName = 'user_verifications';

const UserVerificationSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
        userId: {
            type: ObjectId,
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

export const UserVerificationModel = mongoose.model(collectionName, UserVerificationSchema);