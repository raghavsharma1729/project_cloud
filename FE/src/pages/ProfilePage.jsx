import styled from "@emotion/styled";
import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from '../components/Header';
import { config } from "../config";
import { getToken } from '../util';
import CheckIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

const Image = styled('img')({
    height: '100%',
    width: '100%'
});

const ProfilePage = () => {

    const navigate = useNavigate();
    const [user, setUser] = React.useState({});

    const goToTrips = () => {
        navigate("/profile/trips");
    };

    React.useEffect(() => {
        axios.get(`${config.BASE_URL}/profile`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                // console.log(response.data)
                setUser(response.data);
            })
            .catch(function (error) {

                console.log(error);
            });
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth='sm' style={{ marginTop: 36, marginBottom: 36 }}>
                <Box border={1} borderRadius={2} my={2} px={8} py={2} key={'user'} borderColor='#64646430' style={{ background: 'aliceblue' }}>
                    <Grid container my={4} direction='row' justifyContent="center" alignItems="center">
                        <Grid item xs={6} p={4}>
                            <Image src={user.gender === 'Male' ? '../../male-user.png' : '../../female-user.png'} />
                        </Grid>
                        <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start" textAlign='left'>
                            <Typography variant="h6" color='info.main' borderBottom={2}>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="subtitle2" color='info.main'>
                                {user.email}
                            </Typography>
                            <Typography variant="subtitle2" >
                                Member since {dayjs(user.createdAt).format('DD-MMM-YYYY')}
                            </Typography>
                            <Stack direction='row'>
                                <Typography variant="subtitle2" >
                                    Email verified &nbsp;
                                </Typography>
                                {user.emailVerified ? <CheckIcon /> : <CancelTwoToneIcon />}
                            </Stack>
                            <Typography variant="subtitle2" >
                                Trip Created: {user.tripsCreated}
                            </Typography>
                            <Typography variant="subtitle2" >
                                Trip Joined: {user.tripsJoined}
                            </Typography>
                            <Box my={2}>
                                <Divider />
                            </Box>
                            <Button variant="contained" onClick={goToTrips} >Show Trips</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );
}


export default ProfilePage;