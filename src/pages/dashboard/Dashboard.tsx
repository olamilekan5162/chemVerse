import Hero from "../../components/hero/Hero";
// import { Spinner } from "flowbite-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="bg-secondary dark:bg-primary dark:text-secondary text-primary mx-auto mt-[20px] flex h-fit w-[95%] flex-row p-6">
        <div className="flex h-full w-full flex-1/2 items-center">
          <div className="mx-auto flex flex-col items-center gap-7">
            <p className="text-2xl font-medium">
              IUPAC Name: <span className="text-xl font-normal">O2</span>
            </p>
            <p className="text-2xl font-medium">
              Compound Name: <span className="text-xl font-normal">Oxygen</span>
            </p>
            <p className="text-2xl font-medium">
              Molecular Mass: <span className="text-xl font-normal">16</span>
            </p>
            <p className="text-2xl font-medium">
              Atomic Mass: <span className="font-nonrmal text-xl">8</span>
            </p>
          </div>
        </div>
        <div className="flex flex-1/2">
          <img
            src="https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/Fluorine/png"
            alt="glucose"
            className="h-auto w-[300px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
