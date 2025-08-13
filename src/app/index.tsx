import { RouterProvider } from "./providers";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
};

export default App;
