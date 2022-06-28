import React from "react"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Layout = (props: any) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Header />
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'background.default',
                }}>
                {props.children}
            </Box>

            <Footer />
        </ThemeProvider>
    )
}
export default Layout