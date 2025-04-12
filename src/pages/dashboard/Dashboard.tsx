import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/hero";

const Dashboard = () => {
  return (
    <div className="bg-bg-color dark:bg-bg-color-dark flex h-screen w-full flex-col">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Dashboard;
