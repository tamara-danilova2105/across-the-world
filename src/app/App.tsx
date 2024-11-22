import { Navbar } from "@/entities/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Parallax } from "@/entities/Parallax";
import { Footer } from "@/entities/Footer";
import { useLocation } from "react-router";


function App() {

  const location = useLocation()
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />
      {isHomePage && 
        <Parallax />
      }
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;

