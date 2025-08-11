import LookUp from "./pages/Lookup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductRegistrationPage from "./pages/ProductRegistration";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LookUp />} />
          <Route
            path="/product/register"
            element={<ProductRegistrationPage />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
