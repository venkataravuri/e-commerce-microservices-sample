
import * as React from 'react';
import { useParams } from "react-router-dom";
import getProductByVariantSku from "../../api/products"
import addToCart from "../../api/cart"
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
import { useNavigate } from "react-router-dom";

const Product = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    const [product, setProduct] = React.useState({} as any)

    const [textQuantity, setQuantity] = React.useState<number>(1);

    const onQuantityChange = (e: any) => setQuantity(e.target.value);
    const handleAdd = () => setQuantity(textQuantity + 1);
    const handleMinus = () => setQuantity(textQuantity - 1);

    const handleAddToCart = () => {
        const item = {
            productId: product?._id,
            sku: product?.variants[0]?.sku,
            title: product?.title,
            quantity: textQuantity,
            price: product?.price,
            currency: product?.currency
        }
        addToCart(item).then((result) => {
            console.log(result)
            navigate('/cart')
        })
    }

    // run on load
    React.useEffect(() => {
        getProductByVariantSku(id).then(result => setProduct(result))
    }, [])

    return (
        <Box sx={{ p: 1 }}>
            <Paper elevation={3}>
                <Grid container>
                    <Grid item xs={4} sx={{ p: 2 }}>
                        <Grid container direction="column"
                            justifyContent="center"
                            alignItems="center">
                            <Grid item>
                                <Typography variant="h5">{product?.title}</Typography>
                            </Grid>
                            <Grid item>
                                <img src={product?.thumbnail} width="200"></img>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction="column">
                            <Grid sx={{ p: 1 }}>
                                <Typography variant="h6">{product?.attributes?.brand}</Typography>
                            </Grid>
                            <Grid item sx={{ p: 1 }}>
                                <Typography>{product?.description}</Typography>
                            </Grid>
                            <Grid item sx={{ p: 1 }}>
                                <Typography variant="h6">$ {product?.price}</Typography>
                            </Grid>
                            <Grid item sx={{ p: 1 }}>
                                Rating&nbsp;&nbsp;<Chip icon={<StarIcon />} label={product?.rating} />
                            </Grid>
                            <Grid item sx={{ p: 1 }}>
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
                                    value={textQuantity}
                                    defaultValue="1"
                                />
                                <IconButton color="primary" aria-label="increment" component="span"
                                    onClick={handleAdd}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>
                            <Grid item sx={{ p: 1 }}>
                                <Grid container direction="row">
                                    <Grid item sx={{ p: 1 }}>
                                        <Button variant="outlined" startIcon={<PaidIcon />}>Buy Now</Button>
                                    </Grid>
                                    <Grid item sx={{ p: 1 }}>
                                        <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={handleAddToCart}>Add to Cart</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box >

    )
}

export default Product