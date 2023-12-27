import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { getCart } from "../../api/cart";
import { CircularLoading } from "../../components/Loading/CircularLoading";
import { useBearStore } from "../../store/store";
import { formatPrice } from "../../factories/formatPrice";
import Typography from "@mui/material/Typography";
import { CssTextField } from "../../components/CssTextField/CssTextField";

const Cart = () => {
  const [cart, setCart] = useState({} as any);
  const { loggedInUserEmail } = useBearStore();

  const Loading = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularLoading />
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
    if (cart.items.length === 0) {
      return (
        <Grid container direction="row" sx={{ p: 1 }}>
          <Grid item xs={6}>
            <Typography variant="h6">카트에 담긴 상품이 없습니다.</Typography>
          </Grid>
        </Grid>
      );
    }

    return cart.items.map((item: any, index: number) => (
      <Grid container key={index} direction="row" sx={{ p: 1 }}>
        <Grid item xs={6}>
          <Typography variant="h6">{item.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography></Typography>
          <Grid item>
            <CssTextField
              sx={{ width: "8ch", pb: 3 }}
              required
              id="quantity"
              label="Quantity"
              size="small"
              value={item.quantity}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography>{`${formatPrice(
            (parseInt(item.price) * parseInt(item.quantity)).toString()
          )}원`}</Typography>
        </Grid>
      </Grid>
    ));
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        alignItems: "row",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ width: "60%" }}>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {renderCartItems()}
          </Grid>
          <Grid
            item
            ml={2}
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              borderLeft: "1px solid #c9c9c9",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {`총 주문금액:`}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {`${formatPrice(
                cart && cart.total ? cart.total.toString() : "0"
              )}원`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Cart;
