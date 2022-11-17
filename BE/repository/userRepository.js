import { UserModel } from "./model/user.js";
import { ObjectId } from 'mongodb';


const convertUserDocumentToObject = (document) =>
    document.toObject({
        getters: true,
        versionKey: false,
        transform: (doc, ret) => ({
            ...ret,
            userId: ret.userId && ret.userId.toString()
        })
    });

const create = async (user) => {
    const result = await UserModel.create(user);
    return result && convertUserDocumentToObject(result);
};

const updateVerification = async (userId) => {
    const result = await UserModel.findOneAndUpdate({
        _id: new ObjectId(userId)
    },
        { $set: { emailVerified: true } },
        {
            new: true,
            runValidators: true,
        });
    return result && convertUserDocumentToObject(result);
};

const findUserByEmailAndPassword = async (email, password) => {
    const result = await UserModel.findOne({ email, password });
    return result && convertUserDocumentToObject(result);
};

const findUserById = async (id) => {
    const result = await UserModel.findById(id);
    return result && convertUserDocumentToObject(result);
};


const userRepository = { create, findUserByEmailAndPassword, findUserById, updateVerification };

export default userRepository;