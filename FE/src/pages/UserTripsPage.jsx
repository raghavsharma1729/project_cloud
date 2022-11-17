import { Box, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";
import React from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';
import TripTile from "../components/TripTile";
import { config } from "../config";
import { getToken } from '../util';

const UserTripsPage = () => {

    const [createdTrips, setCreatedTrips] = React.useState([]);
    const [joinedTrips, setJoinedTrips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


    React.useEffect(() => {
        setLoading(true);
        fetchUserCreatedTrips();
        fetchJoinedTrips();
    }, []);

    const fetchUserCreatedTrips = () => {
        axios.get(`${config.BASE_URL}/profile/trips`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                console.log(response.data);
                setLoading(false);
                setCreatedTrips(response.data);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const fetchJoinedTrips = () => {
        axios.get(`${config.BASE_URL}/profile/trips/joined`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                console.log(response.data);
                setJoinedTrips(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }
    return (
        <>
            <Header />
            <Container style={{ marginTop: 36, marginBottom: 36 }}>
                <Stack direction='row'>
                    <Stack>
                        <Grid>
                            <Typography variant="h4" color='secondary' textAlign='left'>
                                Trips Created By You
                            </Typography>
                        </Grid>
                        {loading && <LinearProgress />}
                        <Divider />
                        <Box container spacing={4}>
                            {createdTrips.map((trip) => (
                                <TripTile trip={trip} />
                            ))}
                        </Box>
                    </Stack>
                    <Box mx={2}>
                        <Divider orientation="vertical" />
                    </Box>
                    <Stack>
                        <Grid>
                            <Typography variant="h4" color='secondary' textAlign='left'>
                                Trips You Joined
                            </Typography>
                        </Grid>
                        {loading && <LinearProgress />}
                        <Divider />
                        <Box container spacing={4}>
                            {joinedTrips.map((trip) => (
                                <TripTile trip={trip} />
                            ))}
                        </Box>
                    </Stack>
                </Stack>
            </Container>
            <Footer />
        </>
    );
}

export default UserTripsPage;