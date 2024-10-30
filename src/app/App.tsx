import { Navbar } from "@/entities/Navbar";
import { AppRouter } from "./router/ui/AppRouter";
import { Header } from "@/entities/Header";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
