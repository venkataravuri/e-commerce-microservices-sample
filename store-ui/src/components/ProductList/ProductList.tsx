import StarIcon from "@mui/icons-material/Star";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient, { productsUrl } from "../../api/config";
import { CircularLoading } from "../Loading/CircularLoading";
import { formatPrice } from "../../factories/formatPrice";

const ProductList = () => {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  const loadProductList = async () => {
    try {
      const response = await axiosClient.get(productsUrl + "all-products");
      setProductList(response.data);
      setError(null);
    } catch (err: any) {
      setError(err);
    }
  };

  // run on load
  useEffect(() => {
    loadProductList();
  }, []);

  if (productList.length === 0) {
    return <CircularLoading />;
  }

  const productCards: React.ReactNode = (
    <Grid container>
      {productList.map((productItem: any) => (
        <Grid
          item
          key={productItem._id}
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 2,
          }}
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <Link
            component="button"
            onClick={() => {
              navigate("product/" + productItem._id);
            }}
            underline="none"
          >
            <Card sx={{ width: 240, height: 290 }}>
              <CardMedia
                sx={{ width: "100%", height: "65%" }}
                image={productItem.thumbnail}
                title={productItem.title}
              />
              <CardContent sx={{ height: 10 }}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography color="text.secondary">
                      {productItem.title}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      p: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography variant="h6">
                      {" "}
                      {formatPrice(productItem.price)}원
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      icon={<StarIcon sx={{ "&&": { color: "#FB9F2C" } }} />}
                      label={productItem.rating}
                    />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        width: "60%",
        pb: 3,
        pt: 3,
        // backgroundColor: "green",
      }}
    >
      <Typography
        variant="h4"
        sx={{ pt: 2, pl: 2, pb: 5, color: "text.primary" }}
      >
        {" "}
        전체 상품
      </Typography>
      {productCards}
    </Paper>
  );
};

export default ProductList;
