import { Navbar } from "@/entities/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Footer } from "@/entities/Footer";


function App() {


  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;

