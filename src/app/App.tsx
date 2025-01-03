import { Navbar } from "@/widgets/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Parallax } from "@/entities/Parallax";
import { Footer } from "@/widgets/Footer";
import { ScrollToTop } from "@/entities/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Parallax />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;

