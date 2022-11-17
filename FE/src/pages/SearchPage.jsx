import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Box, Button, Container, Divider, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import queryString from 'query-string';
import React from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';
import TripTile from "../components/TripTile";
import { config } from "../config";
import LinearProgress from '@mui/material/LinearProgress';
import { Search } from '@mui/icons-material';
import { isEmpty, isEqual } from 'lodash';
import PillText from '../components/PillText';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const SearchContainer = () => {

    const initialState = {
        place: '',
        places: [],
        startDate: null,
        endDate: null
    };

    const [inputs, setInputs] = React.useState(
        initialState
    );

    const [trips, setTrips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const clearState = () => {
        setInputs(initialState);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleEndDateChange = (endDate) => {
        setInputs(values => ({ ...values, endDate: endDate.format('MMM-DD-YYYY') }))
    };
    const handleStartDateChange = (startDate) => {
        let dates = {
            startDate: startDate.format('MMM-DD-YYYY'),
            endDate: inputs.endDate
        }
        if (startDate.isAfter(inputs.endDate)) {
            dates = {
                ...dates, endDate: startDate
            }
        }
        setInputs(values => ({ ...values, ...dates }))
    };
    const handleAddingDestination = () => {
        const places = inputs.places;
        places.push(inputs.place);
        setInputs(values => ({ ...values, places, place: '' }))
    };
    const handleSearch = () => {
        setLoading(true);
        const filterQuery = queryString.stringify(
            {
                places: inputs.places,
                startDate: inputs.startDate,
                endDate: inputs.endDate
            });
        axios.get(`${config.BASE_URL}/trips?${filterQuery}`, {})
            .then(function (response) {
                console.log(response.data);
                setTrips(response.data);
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
                <Grid>
                    <Typography variant="h4" color='secondary' textAlign='left' style={{ fontWeight: 'bold' }}>
                        Search for Trips
                    </Typography>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} md={4} >
                        <Stack direction="row" spacing={2}>
                            <Box width='90%'>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="search"
                                    label="Seach Destinations"
                                    name="place"
                                    value={inputs.place}
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box py={2}>
                                <IconButton color="primary" aria-label="add places" onClick={handleAddingDestination}>
                                    <AddLocationIcon />
                                </IconButton>
                            </Box>
                        </Stack>
                        <Stack direction='row'>
                            {inputs.places?.map((place) =>
                                <PillText>
                                    {place}
                                </PillText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3} direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Grid item>
                                <DatePicker
                                    margin="normal"
                                    label="Start Date"
                                    inputFormat="MMM-DD-YYYY"
                                    value={inputs.startDate}
                                    minDate={new Date()}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => <TextField {...params} />
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <DatePicker
                                    margin="normal"
                                    label="End Date"
                                    inputFormat="MMM-DD-YYYY"
                                    minDate={inputs.startDate}
                                    value={inputs.endDate}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Stack spacing={2}>
                            {isEqual(initialState, inputs) ||
                                <Button variant="outlined" onClick={clearState} startIcon={<CloseTwoToneIcon />} fullWidth disabled={loading}> Clear </Button>}
                            <Button variant="contained" onClick={handleSearch} startIcon={<Search />} fullWidth disabled={loading}> Search </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Box my={2}>
                    {loading && <LinearProgress />}
                    <Divider />
                </Box>
                {isEmpty(trips) && loading === false ?
                    <Box display='flex' alignItems='center' justifyContent='center' height='75vh'>
                        <Typography variant='h5'>No trips found</Typography>
                    </Box>
                    :
                    <Box container spacing={4}>
                        {trips.map((trip) => (
                            <TripTile trip={trip} />
                        ))}
                    </Box>
                }
            </Container>
            <Footer />
        </>
    );
}

export default SearchContainer;