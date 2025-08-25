import { type ReactNode } from "react";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen">
      <header>
        <nav>Price Scanner</nav>
      </header>
      <main>{children}</main>
      <Toaster />
      <footer className="align-text-bottom"></footer>
    </div>
  );
};

export default Layout;
