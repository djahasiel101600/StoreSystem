import type { ReactNode } from "react";

const ProtecedRoutes = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default ProtecedRoutes;
