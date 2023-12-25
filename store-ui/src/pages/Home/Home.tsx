import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Deals from "../../components/Deals/Deals";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Deals />
      </Box>
    </div>
  );
}

export default Home;
