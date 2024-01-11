import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Layout from "./components/layout/Layout";
import SignIn from "./pages/SignIn/SignIn";
import MyPage from "./pages/MyPage/MyPage";
import SignUp from "./pages/SignUp/SignUp";

const App = (props: any) => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </Layout>
  );
};
export default App;
