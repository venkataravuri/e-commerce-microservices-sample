import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Footer() {
    return (
        <footer className="footer">
            <Box sx={{
                bgcolor: 'background.default', color: 'text.secondary', fontSize: 16, p: 1
            }}>
                <Grid container sx={{ mb: 1, p: 1 }}>
                    <Grid item xs={8}
                        spacing={2}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid item>
                            Contact Us
                        </Grid>
                        <Grid item>
                            About Us
                        </Grid>
                        <Grid item>
                            Terms Of Use
                        </Grid>
                        <Grid item>
                            Privacy
                        </Grid>
                    </Grid>
                        <Grid item xs={4} justifyContent="flex-end"
                            alignItems="center">Copyright © 2022
                        </Grid>
                </Grid>
            </Box>
        </footer >
    )
}

export default Footer