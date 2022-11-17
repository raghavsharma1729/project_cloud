import * as React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import PillText from './PillText';



const TripTile = ({ trip }) => {
    const navigate = useNavigate();
    const { title, destinations, description, cost, members, fromDate, toDate, _id, creator } = trip;
    const goToTrip = () => {
        navigate(`/trips/${_id}`);
    }
    const goToUser = () => {
        navigate(`/users/${creator[0]._id}`);
    }
    return (
        <Box border={1} borderRadius={2} mt={2} px={8} py={2} key={_id} borderColor='gray'>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center" onClick={goToTrip} py={.5}>
                <Grid item>
                    <Typography variant='h6' color='primary'>{title}</Typography>
                </Grid>
                <Grid item>
                    <Stack direction='row' px={3}>
                        <PeopleIcon />
                        <Typography > &nbsp;{members}</Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center" py={.5}>
                <Grid item>
                    <Stack direction='row'>
                        <DateRangeIcon />
                        <Typography>
                            &nbsp; {dayjs(fromDate).format('DD-MMM-YYYY')}&nbsp; to &nbsp;{dayjs(toDate).format('DD-MMM-YYYY')}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item>
                    <PillText>
                        Cost: ${cost}
                    </PillText>
                </Grid>
            </Grid>
            <Grid container direction="row"
                justifyContent="flex-start"
                alignItems="center" py={.5}>
                <Grid item>
                    <Typography>{description}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center" >
                <Grid item>
                    <Stack direction='row'>
                        <LocationOnIcon />
                        <>
                            {destinations.map((place) => (
                                <PillText>
                                    {place}
                                </PillText>
                            ))}
                        </>
                    </Stack>
                </Grid>
                <Grid item>
                    <Button
                        key={'logout'}
                        onClick={goToUser}
                        sx={{ my: 2 }}
                    >
                        <AccountCircleIcon /> <Typography textAlign="center" px={2}>&nbsp;{creator[0].firstName} {creator[0].lastName}</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TripTile;