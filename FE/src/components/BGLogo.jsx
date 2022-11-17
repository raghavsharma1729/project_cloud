import React from "react";
import { Typography } from "@mui/material";


function BGLogo() {
    return (<Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
            mr: 2,
            display: { md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
        }}
    >
        VacayPooling
    </Typography>);
}

export default BGLogo;