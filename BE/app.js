import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userController from './controller/userController.js';
import tripController from './controller/tripController.js';
import * as dotenv from 'dotenv';
import {
    handleLogs,
    handleErrors,
    handleDbConnection,
    handleRoutes
} from './middleware/index.js';
import { handleAuthentication, handleAuthenticationForAdmin } from './middleware/handleAuthentication.js';


dotenv.config()

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(handleLogs);
app.use(handleDbConnection);

//routes
app.post("/signup", userController.create);
app.post("/login", userController.login);

// secured routes
// trip routes
// Search Trip API getAPI for Trips ( not require authentication)
app.get("/trips", tripController.findTrips);

// edit trip by the user (authenticaiton is required)
// edit trip by the admin
app.put("/trips/:trip_id", handleAuthentication, tripController.update)

//create Trip
app.post("/trips", handleAuthentication, tripController.create);
// fetch a single trip (not require authentication)
app.get("/trips/:trip_id", tripController.getById);

// trip joining request
app.post("/trips/:trip_id/request", handleAuthentication, tripController.joinRequest);

//users routes
// fetch all users profile (only admin access)
// fetch a single user profile (only admin access)
app.get("/users/:user_id", handleAuthentication, userController.getById);
app.get("/users/verify/:token", userController.verify);

// fetch trips created by user
app.get("/profile/trips", handleAuthentication, userController.fetchUserTrips);

//fetch trips user has joined or or part of 
app.get("/profile/trips/joined", handleAuthentication, userController.fetchJoinedTrips);

// edit a user profile (admin and user it self) This api to verify the user identification

// verify user email 
// new table userToken with userId, token, TTL, 
// send user email with the link 
// method: GET path: /user/verify?token=

// Forgot password user 
// new table userToken with userId, token, TTL, 
// front-end url should look like this user
// from UI user will send the request along with token and new password
// Method POST: /user/forgot-password body: {token: , newpassword:} (this api does not authentiation)

// fetch user own profile 
app.get("/profile", handleAuthentication, userController.fetchProfile);

app.use(handleRoutes);
app.use(handleErrors);

app.listen(8000, () => {
    console.log("Server running on port 8000")
});
