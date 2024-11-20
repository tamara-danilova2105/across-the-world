import { Navbar } from "@/entities/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Parallax } from "@/entities/Parallax";

function App() {
  return (
    <>
      <Navbar />
      {/* TODO - Parallax только на странице main */}
      <Parallax />
      <AppRouter />
    </>
  );
};

export default App;

