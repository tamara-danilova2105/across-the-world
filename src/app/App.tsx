import { Navbar } from "@/widgets/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Parallax } from "@/entities/Parallax";
import { Footer } from "@/widgets/Footer";
import { ScrollToTop } from "@/entities/ScrollToTop";
import { Cookie } from "@/entities/Cookie/index";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Parallax />
      <AppRouter />
      <Footer />
      <Cookie/>
    </>
  );
};

export default App;

