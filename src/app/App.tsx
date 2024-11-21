import { Navbar } from "@/entities/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Parallax } from "@/entities/Parallax";
import { Footer } from "@/entities/Footer";

function App() {
  return (
    <>
      <Navbar />
      {/* TODO - Parallax только на странице main */}
      <Parallax />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;

