import { Navbar } from "@/entities/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Header } from "@/entities/Header";
// import { Parallax } from "@/entities/Parallax";

function App() {
  return (
    <>
      <Header />
      {/* <Parallax /> */}
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;

