import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div className="bg-bg-color dark:bg-bg-color-dark flex h-full w-full flex-col pt-[100px]">
      <Navbar />
      <Outlet />;
      <Footer />
    </div>
  );
};
export default App;
