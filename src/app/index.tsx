import { RouterProvider } from "./providers";
import { AppRoutes } from "./routes";
import { StoreProvider } from "./providers";
import { Layout } from "@/shared/ui";

const App = () => {
  return (
    <RouterProvider>
      <StoreProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </StoreProvider>
    </RouterProvider>
  );
};

export default App;
