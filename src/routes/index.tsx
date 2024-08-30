import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetailPage from "../pages/ProductDetailPage";

const AppRoutes = () => {
  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path={`/`} element={<Products />} />
        <Route path={`/product-detail-page/:id`} element={<ProductDetailPage />} />
        <Route path={`/*`} element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
