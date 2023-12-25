import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getCart } from "../../api/cart";
import { useBearStore } from "../../store/store";

const Cart = () => {
  const [cart, setCart] = useState({} as any);

  // const [textQuantity, setQuantity] = useState<number>(1);

  const { loggedInUserEmail } = useBearStore();

  // const onQuantityChange = (e: any) => setQuantity(e.target.value);
  // const handleAdd = () => setQuantity(textQuantity + 1);
  // const handleMinus = () => setQuantity(textQuantity - 1);
  const Loading = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );

  // run on load
  useEffect(() => {
    getCart(loggedInUserEmail).then((cart) => {
      console.log(cart);
      setCart(cart);
    });
  }, []);

  if (!cart || !cart.items) {
    return Loading();
  }

  const renderCartItems = () => {
    return cart.items.map((item: any, index: number) => (
      <Grid container key={index} direction="row" sx={{ p: 1 }}>
        <Grid item xs={6}>
          <Typography variant="h6">{item.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography></Typography>
          <Grid item>
            {/* <IconButton
                color="primary"
                aria-label="decrement"
                component="span"
                onClick={handleMinus}
              >
                <RemoveCircleIcon />
              </IconButton> */}
            <TextField
              sx={{ width: "8ch" }}
              required
              id="quantity"
              label="Quantity"
              size="small"
              // onChange={onQuantityChange}
              value={item.quantity}
            />
            {/* <IconButton
                color="primary"
                aria-label="increment"
                component="span"
                onClick={handleAdd}
              >
                <AddCircleIcon />
              </IconButton> */}
          </Grid>
        </Grid>
        <Grid item>
          <Typography>{"$" + item.price}</Typography>
        </Grid>
      </Grid>
    ));
  };

  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {renderCartItems()}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Cart;
