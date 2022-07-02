import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import StarIcon from '@mui/icons-material/Star';
import axiosClient, { productsUrl } from '../../api/config';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Deals = () => {
    const navigate = useNavigate();

    const [deals, setDeals] = useState([])
    const [error, setError] = useState(null)

    const loadDeals = async () => {
        try {
            const response = await axiosClient.get(productsUrl + 'deals')
            setDeals(response.data)
            setError(null)
        } catch (err: any) {
            setError(err)
        }
    }

    // run on load
    useEffect(() => {
        loadDeals()
    }, [])

    return (
        <Paper elevation={3} sx={{ pl: 2, pb: 2 }}>
            <Typography variant="h6" sx={{ p: 1, color: 'text.primary' }}>Deals of the Day</Typography>
            <Grid container spacing={2} >
                <>
                    {
                        deals.slice(0, 5).map((deal: any) => (
                            <Grid item key={deal.dealId}>
                                <Link component="button"
                                    onClick={() => {
                                        navigate('product/' + deal.variantSku)}
                                        } underline="none">
                                    <Card sx={{ width: 250, height: 290 }}>
                                        <Box><img src={deal.thumbnail} height="150" alt={deal.name}></img></Box>
                                        <CardContent sx={{ height: 50 }}>
                                            <Grid container >
                                                <Grid item xs={12}>
                                                    <Typography color="text.secondary">
                                                        {deal.shortDescription}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <Grid container>
                                                <Grid item xs={6} sx={{ p: 1, display: 'flex', justifyContent: 'flex-start' }}>
                                                    <Typography variant="h6">$ {deal.price}</Typography></Grid>
                                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                    <Chip icon={<StarIcon />} label={deal.rating} />
                                                </Grid>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                </Link>

                            </Grid>

                        ))
                    }
                </>
            </Grid>
        </Paper>
    )
}

export default Deals