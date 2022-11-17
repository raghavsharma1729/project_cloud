import { UserModel } from "./model/user.js";
import { UserVerificationModel } from "./model/userVerification.js";
import { ObjectId } from 'mongodb';


const convertUserVerificationDocumentToObject = (document) =>
    document.toObject({
        getters: true,
        versionKey: false,
        transform: (doc, ret) => ({
            ...ret,
            userId: ret.userId && ret.userId.toString()
        })
    });

const create = async (userVerification) => {
    const result = await UserVerificationModel.create(userVerification);
    return result && convertUserVerificationDocumentToObject(result);
};

const findByToken = async (token) => {
    const result = await UserVerificationModel.findOne({ token });
    return result && convertUserVerificationDocumentToObject(result);
};

const findAndDelete = async (userVerification) => {
    const result = await UserVerificationModel.findOneAndDelete(userVerification);
    return result && convertUserVerificationDocumentToObject(result);
};


const userVerificationRepository = { create, findByToken, findAndDelete };

export default userVerificationRepository;