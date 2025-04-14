// Dashboard.jsx
import { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import { chemistryFacts } from "../../utils/chemistryFacts";

const Dashboard = () => {
  const [compound, setCompound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentFact, setCurrentFact] = useState(0);
  const [myFact, setMyFact] = useState("");

  const fetchCompoundData = async (query) => {
    setLoading(true);
    setCompound(null);
    setError("");

    try {
      const res = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/JSON`,
      );
      if (!res.ok) throw new Error("Compound not found");

      const data = await res.json();
      const compoundInfo = data?.PC_Compounds?.[0];
      const id = compoundInfo?.id?.id?.cid;

      const getProp = (label) =>
        compoundInfo?.props?.find((prop) => prop.urn.label === label)?.value;

      setCompound({
        name: query,
        id,
        iupac: getProp("IUPAC Name")?.sval,
        formula: getProp("Molecular Formula")?.sval,
        weight: getProp("Molecular Weight")?.fval,
        mass: getProp("Exact Mass")?.fval,
        boiling: getProp("Boiling Point")?.fval,
        melting: getProp("Melting Point")?.fval,
        logP: getProp("XLogP")?.fval,
        imageUrl: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/PNG`,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const setFact = () => {
      const random = Math.floor(Math.random() * chemistryFacts.length);
      setTimeout(() => {
        setCurrentFact(random);
      }, 20000);
      setMyFact(chemistryFacts[currentFact].fact);
    };
    setFact();
  }, [currentFact]);

  return (
    <div className="flex flex-col items-center">
      <Hero onSearch={fetchCompoundData} />
      <h1 className="text-primary dark:text-secondary mt-7 max-w-2xl text-center text-[18px]">
        <i>Do you Know: {myFact} </i>
      </h1>

      <div className="w-[95%] max-w-6xl px-4 py-8">
        {loading && (
          <div className="text-primary dark:text-secondary animate-pulse text-center text-xl">
            Searching for compound...
          </div>
        )}

        {error && (
          <div className="text-center font-medium text-red-500">{error}</div>
        )}

        {compound && (
          <div className="dark:bg-primary text-primary dark:text-secondary flex flex-col items-center gap-10 rounded-xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] md:flex-row">
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="text-3xl font-bold capitalize">{compound.name}</h2>
              <p>
                <strong>IUPAC Name:</strong> {compound.iupac || "N/A"}
              </p>
              <p>
                <strong>Molecular Formula:</strong> {compound.formula || "N/A"}
              </p>
              <p>
                <strong>Molecular Weight:</strong> {compound.weight || "N/A"}{" "}
                g/mol
              </p>
              <p>
                <strong>Exact Mass:</strong> {compound.mass || "N/A"}
              </p>
              <p>
                <strong>Boiling Point:</strong> {compound.boiling || "N/A"}°C
              </p>
              <p>
                <strong>Melting Point:</strong> {compound.melting || "N/A"}°C
              </p>
              <p>
                <strong>LogP:</strong> {compound.logP || "N/A"}
              </p>
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.id}`}
                target="_blank"
                rel="noreferrer"
                className="bg-primary dark:bg-secondary dark:text-primary mt-4 inline-block w-fit rounded px-4 py-2 text-white hover:opacity-80"
              >
                View Full PubChem Record ↗
              </a>
            </div>

            <div className="flex flex-1 justify-center">
              <img
                src={compound.imageUrl}
                alt={compound.name}
                className="border-primary dark:border-secondary h-[250px] w-[250px] rounded-full border-4 object-contain shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
