import { RouterProvider, StoreProvider } from "./providers";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <RouterProvider>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </RouterProvider>
  );
};

export default App;
