import LookUp from "./pages/Lookup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductRegistrationPage from "./pages/ProductRegistration";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
