import { Routes, Route } from "react-router-dom";
import ROUTES from "@/shared/config/routes";
import ScanPage from "@/pages/scan/ui/ScanPage";
import LoginPage from "@/pages/login/ui/LoginPage";
import AddProductPage from "@/pages/add-product/ui/AddProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path={ROUTES.LOGIN} />
      <Route element={<ScanPage />} path={ROUTES.SCANNER} />
      <Route element={<AddProductPage />} path={ROUTES.ADD_PRODUCT} />
    </Routes>
  );
};

export default AppRoutes;
