import { Navbar } from "@/widgets/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Parallax } from "@/entities/Parallax";
import { Footer } from "@/widgets/Footer";
import { ScrollToTop } from "@/entities/ScrollToTop";
import { Cookie } from "@/entities/Cookie/index";
import { useLocation } from "react-router";
import { AdminLayout } from "./AdminLayout";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminLayout />;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Parallax />
      <AppRouter />
      <Footer />
      <Cookie />
    </>
  );
};

export default App;

