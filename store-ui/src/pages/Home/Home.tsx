import data from '../../utils/assets'
import './Home.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deals from '../../components/Deals/Deals'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Deals />
      </Box>
      <Grid container>
        <Grid item sx={{ pl: 2, pr: 2, width: '100%'}}>
          <Paper elevation={3} sx={{ pl: 2, pb: 2 }}>
            <Typography variant="h6" sx={{ p: 1, color: 'text.primary' }}>Shop by Category</Typography>
            <Grid container spacing={2}>
              <>
                {
                  data['categories'].map((category, index) => (
                    <Grid item key={index}>
                      <Card sx={{ width: 160, height: 200 }}>
                        <CardContent>
                          <Typography color="text.secondary" >
                            {category.name}
                          </Typography>
                          <Box> <img src={category.image} height="128" alt={category.name}></img></Box>
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
