import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import Home from './pages/Home';
import CreateTripPage from './pages/CreateTripPage';
import SearchPage from './pages/SearchPage';
import SignInPage from './pages/SignIn';
import useAuth from './hooks/useAuth';
import SignUpPage from './pages/SignUp';
import TripPage from './pages/Trippage';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';
import PageNotFound from './pages/NotFound';
import UserVerificationPage from './pages/UserVerification';
import UserTripsPage from './pages/UserTripsPage';


function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

const RouterContent = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<SignInPage></SignInPage>} />
            <Route path="/registration" element={<SignUpPage></SignUpPage>} />
            <Route path="/publish/trip" element={<RequireAuth><CreateTripPage></CreateTripPage></RequireAuth>} />
            <Route path="/trips/search" element={<SearchPage></SearchPage>} />
            <Route path="/trips/:tripId" element={<TripPage></TripPage>} />
            <Route path="/users/:userId" element={<UserPage></UserPage>} />
            <Route path="/users/verify/:token" element={<UserVerificationPage></UserVerificationPage>} />
            <Route path="/profile" element={<ProfilePage></ProfilePage>} />
            <Route path="/profile/trips" element={<RequireAuth><UserTripsPage></UserTripsPage></RequireAuth>} />
            <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
    </Router>
);

export default RouterContent;