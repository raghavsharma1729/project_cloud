import AddLocationIcon from '@mui/icons-material/AddLocation';
import ShareLocationRoundedIcon from '@mui/icons-material/ShareLocationRounded';
import { Grid, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import dayjs from 'dayjs';
import React from "react";
import { useNavigate } from "react-router-dom";
import DayPlan from "../components/DayPlan";
import Footer from '../components/Footer';
import Header from '../components/Header';
import { config } from '../config';
import useAuth from "../hooks/useAuth";
import { getToken } from "../util";

const CreateTripPage = () => {
    const navigate = useNavigate();
    const { authed } = useAuth();

    const [inputs, setInputs] = React.useState(
        {
            startDate: dayjs(),
            endDate: dayjs(),
            tripDetails: { 0: '' },
            destinations: []
        });

    const [tripLength, setTripLength] = React.useState(1);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handlePlans = (value) => {
        setInputs(values => ({ ...values, tripDetails: value }))
        console.log(value);
    }

    const [error, setError] = React.useState();
    // is user not logged in redirect to login
    React.useEffect(() => {
        if (!authed) {
            navigate("/login");
        }
    }, []);

    // React.useEffect(() => {
    //     console.log(inputs);
    // }, [inputs]);

    const handleStartDateChange = (startDate) => {
        let dates = {
            startDate,
            endDate: inputs.endDate
        }
        if (startDate.isAfter(inputs.endDate)) {
            dates = {
                ...dates, endDate: startDate
            }
        }
        setInputs(values => ({ ...values, ...dates }))
        calculateTripLength(dates.startDate, dates.endDate);
    };

    const calculateTripLength = (startDate, endDate) => {
        const date2 = dayjs(new Date(startDate.format('DD-MMM-YYYY')));
        const date1 = dayjs(new Date(endDate.format('DD-MMM-YYYY')));
        let noOfDays = 0;
        if (date1.isSame(date2, 'day')) {
            noOfDays = 1;
        }
        else {
            const dayDiff = date1.diff(date2, 'day')
            noOfDays = dayDiff + 1;
        }
        setTripLength(noOfDays);
    }

    const handleEndDateChange = (endDate) => {
        setInputs(values => ({ ...values, endDate }))
        calculateTripLength(inputs.startDate, endDate);
    };

    const handleAddingDestination = () => {
        const destinations = inputs.destinations;
        destinations.push(inputs.place);
        setInputs(values => ({ ...values, destinations, place: '' }))
    };

    const handleSubmit = () => {
        const tripDetails = Object.keys(inputs.tripDetails).map((key) => {
            return { day: Number(key) + 1, detail: inputs.tripDetails[key] }
        });
        const payload = {
            title: inputs.title,
            description: inputs.description,
            destinations: inputs.destinations,
            fromDate: inputs.startDate.toISOString(),
            toDate: inputs.endDate.toISOString(),
            cost: Number(inputs.cost),
            members: Number(inputs.members),
            tripDetails,
            chatLink: inputs.chatLink
        }

        axios.post(`${config.BASE_URL}/trips/`, payload, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                console.log(response)
                navigate(`/trips/${response.data.id}`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Header />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ShareLocationRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Share your plan
                    </Typography>
                    <Box component="form" width='100%'>
                        <Stack spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Trip Title"
                                name="title"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="About Trip"
                                name="description"
                                autoFocus
                                onChange={handleChange}
                            />
                            <Stack direction="row" spacing={2}>
                                <Box width='90%'>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="place"
                                        label="destinations"
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
                            <Typography style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                background: 'aliceblue',
                                marginTop: '0px',
                                color: 'cornflowerblue',
                                textAlign: 'left',
                                paddingLeft: 16
                            }}>
                                {inputs.destinations?.join(", ")}
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="chatLink"
                                label="Chat Link"
                                id="chatLink"
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="cost"
                                label="Estimated Cost"
                                id="cost"
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                name="members"
                                label="Members"
                                id="members"
                                onChange={handleChange}
                            />
                            <DesktopDatePicker
                                margin="normal"
                                sx={{ mt: '100%' }}
                                label="Start Date"
                                inputFormat="MM/DD/YYYY"
                                value={inputs.startDate}
                                minDate={dayjs()}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopDatePicker
                                margin="normal"
                                sx={{ mt: '100%' }}
                                label="End Date"
                                inputFormat="MM/DD/YYYY"
                                minDate={inputs.startDate}
                                value={inputs.endDate}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Typography textAlign='left'>
                                Plans Details
                            </Typography>
                            <DayPlan noOfDays={tripLength} tripDetails={inputs.tripDetails} handlePlans={handlePlans} />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Share Plan
                            </Button>
                            <p style={{ color: "red" }}>{error}</p>
                        </Stack>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
}

export default CreateTripPage;