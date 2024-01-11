import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        sx={{ flexGrow: 1, p: 2, display: "flex", justifyContent: "center" }}
      >
        <ProductList />
      </Box>
    </div>
  );
}

export default Home;
