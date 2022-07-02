
import { useParams } from "react-router-dom";
import { getCart } from "../../api/cart"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState({} as any)

    const [textQuantity, setQuantity] = useState<number>(1);

    const onQuantityChange = (e: any) => setQuantity(e.target.value);
    const handleAdd = () => setQuantity(textQuantity + 1);
    const handleMinus = () => setQuantity(textQuantity - 1);

    // run on load
    useEffect(() => {
        getCart().then((cart) => {
            console.log(cart)
            setCart(cart)
        })
    }, [])

    return (
        <Box sx={{ p: 1 }}>
            <Paper elevation={3} sx={{ p: 1 }}>
                {cart?.items?.map((item: any, index: number) => (
                    <Grid container key={index} direction="row" sx={{ p: 1 }}>
                        <Grid item xs={6}>
                            <Typography variant="h6">{item?.title}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography></Typography>
                            <Grid item>
                                <IconButton color="primary" aria-label="decrement" component="span"
                                    onClick={handleMinus}>
                                    <RemoveCircleIcon />
                                </IconButton>
                                <TextField
                                    sx={{ width: '8ch' }}
                                    required
                                    id="quantity"
                                    label="Quantity"
                                    size="small"
                                    onChange={onQuantityChange}
                                    value={item?.quantity}
                                />
                                <IconButton color="primary" aria-label="increment" component="span"
                                    onClick={handleAdd}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography>{'$' + item?.price}</Typography>
                        </Grid>
                    </Grid>
                ))}
                <Grid container>
                    <Grid item xs={12} sx={{  display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" startIcon={<PaidIcon />}>Checkout</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    )
}

export default Cart