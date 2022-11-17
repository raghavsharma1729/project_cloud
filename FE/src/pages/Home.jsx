import { Search } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from '../components/Header';
import Image from "../components/Image";

const HomeContainer = () => {
    const navigate = useNavigate();
    const signup = () => {
        navigate('/registration');
    }
    const login = () => {
        navigate('/login');
    }
    const searchTrips = () => {
        navigate('/trips/search');
    }
    return (
        <>
            <Header />
            <Container>
                <Grid container my={6}>
                    <Grid item xs={6} px={2}>
                        <Image src='../../vacaypooling.jpeg' />
                    </Grid>
                    <Grid item xs={6} textAlign='initial' px={2} >
                        <Typography variant="h4" py={2} color='secondary' style={{ wordSpacing: '8px', fontWeight: 'bold' }} >
                            Want to travel but don’t have a plan ?
                        </Typography>
                        <Typography variant="h5" py={2} color='secondary' style={{ wordSpacing: '8px', fontWeight: 'bold' }} >
                            Looking to find a travel buddy and save on your trip expenses ?
                        </Typography>
                        <Typography py={2} style={{ wordSpacing: '8px', fontWeight: 'bold' }} lineHeight={2}>
                            VacayPooling is a great way to do it all! With our app, you can easily find trips around you. Just enter
                            the places you want to visit on the days you want to travel, and we'll show you a list of potential trips other people are talking.
                            You can then choose to join the trip you like and collaborate with the trip owner.
                        </Typography>
                        <Button variant="contained" onClick={signup}>Register Here</Button>
                        <Button variant="outlined" style={{ margin: '12px' }} onClick={login}>Already a member</Button>
                        <Button variant="contained" endIcon={<Search />} onClick={searchTrips}>
                            Search Trips
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />

        </>
    );
}

export default HomeContainer;