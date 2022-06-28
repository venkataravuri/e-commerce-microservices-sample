import React from 'react';
import data from '../../utils/assets'
import './Home.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import StarIcon from '@mui/icons-material/Star';
import { flexbox } from '@mui/system';

function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Paper elevation={3} sx={{ pl: 2, pb: 2 }}>
          <Typography variant="h6" color="white" sx={{ p: 1 }}>Deals of the Day</Typography>
          <Grid container spacing={2} >
            <>
              {
                data['topDeals'].map((deal) => (
                  <Grid item>
                    <Link component="button"
                      onClick={() => {
                        console.info("I'm a button.");
                      }} underline="none">
                      <Card sx={{ width: 250, height: 290 }}>
                        <Box sx={{ backgroundColor: 'white' }}> <img src={deal.image} height="150"></img></Box>
                        <CardContent sx={{ height: 50 }}>
                          <Grid container >
                            <Grid item xs={12}>
                              <Typography color="text.secondary">
                                {deal.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions>
                          <Grid container xs={12}>
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
      </Box>
      <Grid container>
        <Grid item sx={{ pl: 2, width: '100%'}}>
          <Paper elevation={3} sx={{ pl: 2, pb: 2 }}>
            <Typography variant="h6" color="white" sx={{ p: 1 }}>Shop by Category</Typography>
            <Grid container spacing={2}>
              <>
                {
                  data['categories'].map((category) => (
                    <Grid item>
                      <Card sx={{ width: 160, height: 200 }}>
                        <CardContent>
                          <Typography color="text.secondary" >
                            {category.name}
                          </Typography>
                          <Box> <img src={category.image} height="128"></img></Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                }
              </>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
