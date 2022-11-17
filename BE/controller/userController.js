import http from "../common/enums/http.js";
import { wrapAsync } from "../common/utils/error/wrapAsync.js";
import userService from "../services/userService.js";

const create = async (
    request,
    response
) => {
    const {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        contactNo,
        email,
        password,
        identification,
        profilePicture
    } = request.body;
    const user = { firstName, lastName, gender, dateOfBirth: new Date(dateOfBirth), contactNo, email, password, identification, profilePicture };
    const createdUser = await userService.create(user);
    response.status(http.StatusCode.CREATED).json(createdUser);
};

const login = async (request, response) => {
    const { email, password } = request.body;
    const result = await userService.login(email, password);
    response.status(http.StatusCode.OK).json(result);
};

const fetchProfile = async (request, response) => {
    const user = request.body.user;
    const userProfile = await userService.fetchProfile(user)
    response.status(http.StatusCode.OK).json(userProfile);
};

const getById = async (request, response) => {
    const userId = request.params.user_id;
    const userDetails = await userService.getById(userId);
    response.status(http.StatusCode.OK).json(userDetails);
}

const verify = async (request, response) => {
    const token = request.params.token;
    const result = await userService.verify(token);
    response.status(http.StatusCode.OK).json(result);
}

const fetchUserTrips = async (request, response) => {
    const user = request.body.user;
    const trips = await userService.fetchTrips(user);
    response.status(http.StatusCode.OK).json(trips);
}

const fetchJoinedTrips = async (request, response) => {
    const user = request.body.user;
    const trips = await userService.fetchJoinedTrips(user);
    response.status(http.StatusCode.OK).json(trips);
}

const userController = wrapAsync({
    create,
    login,
    fetchProfile,
    getById,
    fetchUserTrips,
    fetchJoinedTrips,
    verify
});

export default userController;

