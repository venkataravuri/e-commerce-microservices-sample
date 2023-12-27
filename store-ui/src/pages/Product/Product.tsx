import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useParams } from "react-router-dom";
import addToCart from "../../api/cart";
import getProductByProductId from "../../api/products";
import { CssTextField } from "../../components/CssTextField/CssTextField";
import { CircularLoading } from "../../components/Loading/CircularLoading";
import { useBearStore } from "../../store/store";
import { formatPrice } from "../../factories/formatPrice";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState({} as any);
  const [textQuantity, setQuantity] = React.useState<number>(1);

  const { loggedInUserEmail, accessToken } = useBearStore();

  const navigate = useNavigate();

  const onQuantityChange = (e: any) => setQuantity(e.target.value);
  const handleAdd = () => {
    if (textQuantity < 10) {
      setQuantity(textQuantity + 1);
    }
  };
  const handleMinus = () => {
    if (textQuantity > 1) {
      setQuantity(textQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }

    const item = {
      productId: product?._id,
      sku: product?.sku,
      title: product?.title,
      quantity: textQuantity,
      price: product?.price,
      currency: product?.currency,
    };

    const response = await addToCart(loggedInUserEmail, item);
    if (response && (response.status === 200 || response.status === 201)) {
      console.log(`response.status: ${response.status}`);
      alert("카트에 추가되었습니다.");
      // 이때 카드에 담긴 아이템 개수 업데이트
    } else {
      console.log(`response.status: ${response?.status}`);
      alert("카트 추가에 실패했습니다.");
    }
  };

  // run on load
  React.useEffect(() => {
    getProductByProductId(id).then((result) => setProduct(result));
  }, []);

  if (product.length === 0) {
    return <CircularLoading />;
  }

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
            p: 2,
          }}
        >
          <Grid item>
            <Grid container>
              <Grid item>
                <img
                  src={product?.thumbnail}
                  style={{
                    width: "400px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                  alt={product?.title}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" sx={{ pl: 2 }}>
              <Grid item>
                <Typography variant="h5" sx={{ p: 1, fontWeight: "bold" }}>
                  {product?.title}
                </Typography>
              </Grid>
              <Grid sx={{ p: 1 }}>
                <Typography variant="h6">
                  {product?.attributes?.brand}
                </Typography>
              </Grid>
              <Grid item sx={{ p: 1 }}>
                <Typography>{product?.description}</Typography>
              </Grid>
              <Grid item sx={{ p: 1 }}>
                <Typography variant="h6">
                  {formatPrice(product?.price)}원
                </Typography>
              </Grid>
              <Grid item sx={{ p: 1 }}>
                <Chip
                  icon={<StarIcon sx={{ "&&": { color: "#FB9F2C" } }} />}
                  label={product?.rating}
                  sx={{ backgroundColor: "grey" }}
                />
              </Grid>
              <Grid item sx={{ p: 1 }}>
                <IconButton
                  color="primary"
                  aria-label="decrement"
                  component="span"
                  onClick={handleMinus}
                  style={{
                    color: "#222222",
                  }}
                >
                  <RemoveCircleIcon />
                </IconButton>
                <CssTextField
                  required
                  id="quantity"
                  label="개수"
                  size="small"
                  onChange={onQuantityChange}
                  value={textQuantity}
                  defaultValue="1"
                />
                <IconButton
                  color="primary"
                  aria-label="increment"
                  component="span"
                  onClick={handleAdd}
                  style={{
                    color: "#222222",
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <Grid container direction="row">
                  <Grid item sx={{ p: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={handleAddToCart}
                      sx={{
                        backgroundColor: "#A6CF5B",
                        ":hover": {
                          backgroundColor: "#85B04B", // 마우스를 올렸을 때의 배경색
                        },
                      }}
                    >
                      <Typography>장바구니 담기</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Product;
