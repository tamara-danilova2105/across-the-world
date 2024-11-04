import { Navbar } from "@/entities/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Header } from "@/entities/Header";
// import { Parallax } from "@/entities/Parallax";

function App() {
  return (
    <>
      {/* <Parallax/> */}
      <Header />
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
