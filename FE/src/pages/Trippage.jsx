import { AssistantDirectionRounded, DateRange, PersonRounded, TodayRounded } from '@mui/icons-material/';
import PeopleIcon from '@mui/icons-material/People';
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import dayjs from 'dayjs';
import { isEmpty } from "lodash";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';
import PillText from '../components/PillText';
import { config } from "../config";
import { getToken, getUser, isUserSignedIn } from '../util';

const TripPage = () => {
    const params = useParams();

    const [trip, setTrip] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${config.BASE_URL}/trips/${params.tripId}`, {})
            .then(function (response) {
                setTrip(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });
    }, []);


    const requestForTrip = () => {
        setLoading(true);
        if (isUserSignedIn()) {
            axios.post(`${config.BASE_URL}/trips/${params.tripId}/request`, {}, {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            })
                .then(function (response) {
                    // console.log(response)
                    setTrip(response.data);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);

                });
        }
        else {
            navigate("/login");
        }
    }

    const hasUserjoined = (trip) => {
        if (isUserSignedIn()) {
            const user = getUser();
            return trip?.joiners.includes(user.id) || user.id == trip.userId;
        }
    }

    const goToUser = () => {
        navigate(`/users/${trip.creator[0]._id}`);
    }

    return (
        <>
            <Header />
            <Container maxWidth='sm'>
                {loading &&
                    <Box display='flex' alignItems='center' justifyContent='center' height='75vh'>
                        <CircularProgress />
                    </Box>
                }
                {isEmpty(trip) || loading || (
                    <Box border={1} borderRadius={2} my={2} px={8} py={2} key={trip._id} borderColor='#64646430' style={{ background: 'aliceblue' }}>
                        <Box borderBottom={1}>
                            <Grid>
                                <Typography variant="h4" style={{ weight: 'bold', textAlign: 'left' }} color='info.main' textTransform='uppercase'>
                                    {trip?.title}
                                </Typography>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item><Typography variant="h6" style={{ weight: 'bold' }}>Destinations: </Typography></Grid>
                                <Grid item>
                                    <Stack>
                                        {trip?.destinations.map((place) => {
                                            return (<Stack direction='row'>
                                                <AssistantDirectionRounded color="primary" />
                                                <PillText>{place}</PillText>
                                            </Stack>)
                                        })}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>About trip : </Typography></Grid>
                                <Grid item > <Typography variant="h6">  {trip.description} </Typography></Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Estimation Cost : </Typography></Grid>
                                <Grid item > <PillText variant="h6" color="primary"> $ {trip.cost} </PillText></Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Capacity : </Typography></Grid>
                                <Grid item >
                                    <Stack direction='row' alignItems='center'>
                                        <Typography variant="h6" color="primary"> {trip.members} &nbsp; </Typography>
                                        <PeopleIcon color="primary" />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Trip Duration: </Typography></Grid>
                                <Grid item >
                                    <Stack direction='row' alignItems='center'>
                                        <DateRange />
                                        <Typography variant="h6"> &nbsp;{dayjs(trip.fromDate).format('DD-MMM-YYYY')} to {dayjs(trip.toDate).format('DD-MMM-YYYY')} </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item><Typography variant="h6" style={{ weight: 'bold' }}>Detail Itenary: </Typography></Grid>
                                <Grid>
                                    <List dense>
                                        {trip?.tripDetails.map((place) => {
                                            const text = `Day${place.day}: ${place.detail}`;
                                            return (<ListItem>
                                                <ListItemAvatar>
                                                    <TodayRounded color="primary" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={text}
                                                />
                                            </ListItem>)
                                        })}
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Created By: </Typography></Grid>
                                <Grid item >
                                    <Button
                                        key={'logout'}
                                        onClick={goToUser}
                                        sx={{ my: 2, textTransform: 'initial' }}
                                        variant='outlined'
                                    >
                                        <PersonRounded color="primary" /> <Typography textAlign="center" px={2} >&nbsp;{trip.creator[0].firstName} {trip.creator[0].lastName} </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            <Grid container spacing={2} >
                                <Grid item><Typography variant="h6" style={{ weight: 'bold' }}>Joined By: </Typography></Grid>
                                <Grid item>
                                    <Stack>
                                        {trip?.joinee.map((user) => {
                                            const joineName = `${user.firstName} ${user.lastName}`;
                                            return (
                                                <Button
                                                    key={`user${user._id}`}
                                                    onClick={() => { navigate(`/users/${user._id}`) }}
                                                    sx={{ my: 2, textTransform: 'initial' }}
                                                    variant='outlined'
                                                >
                                                    <PersonRounded color="primary" />
                                                    <Typography textAlign="center" px={2}>
                                                        {joineName}
                                                    </Typography>
                                                </Button>)
                                        })}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box my={2}>
                            {hasUserjoined(trip) ? <Grid container spacing={2} >
                                <Grid item ><Typography variant="h6" style={{ weight: 'bold' }}>Chat Link:</Typography></Grid>
                                <Grid item><a href={trip.chatLink} target="_blank">
                                    Chat Link</a> </Grid>
                            </Grid> :
                                <Grid container>
                                    <Grid item >
                                        <Button variant="contained" onClick={requestForTrip}>
                                            Join the Trip
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </Box>
                )}
            </Container>
            <Footer />
        </>
    );
}


export default TripPage;