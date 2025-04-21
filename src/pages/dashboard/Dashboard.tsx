// Dashboard.jsx
import { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import { chemistryFacts } from "../../utils/chemistryFacts";
import { NavLink } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const Dashboard = () => {
  const [compound, setCompound] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentFact, setCurrentFact] = useState(0);
  const [myFact, setMyFact] = useState("");

  const fetchCompoundData = async (query) => {
    setLoading(true);
    setCompound(null);
    setError("");
    const pubChemCompound = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/property/MolecularFormula,MolecularWeight,InChI,Title,SMILES,IUPACName,Charge,HBondAcceptorCount,HBondDonorCount/JSON`;
    const pubChemDescription = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/description/JSON`;

    try {
      const [compoundRes, descriptionRes] = await Promise.all([
        fetch(pubChemCompound),
        fetch(pubChemDescription),
      ]);

      if (!compoundRes.ok) {
        throw new Error("Drug not found");
      }

      if (!descriptionRes.ok) {
        throw new Error("Drug not found");
      }

      const compoundData = await compoundRes.json();
      const descriptionData = await descriptionRes.json();

      setCompound(compoundData.PropertyTable.Properties[0]);
      setDescription(
        descriptionData.InformationList.Information[1].Description,
      );
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
      }, 10000);
      setMyFact(chemistryFacts[currentFact].fact);
    };
    setFact();
  }, [currentFact]);

  return (
    <div className="flex flex-col items-center">
      <Hero onSearch={fetchCompoundData} variation={"dashboard"} />
      <h1 className="text-primary dark:text-secondary mt-6 max-w-2xl text-center text-[18px]">
        <i>
          💡 Did you Know? <br /> {myFact}{" "}
        </i>
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
                <strong>IUPAC Name:</strong> {compound.IUPACName || "N/A"}
              </p>
              <p>
                <strong>Molecular Formula:</strong>{" "}
                {compound.MolecularFormula || "N/A"}
              </p>
              <p>
                <strong>Molecular Weight:</strong>{" "}
                {compound.MolecularWeight || "N/A"} g/mol
              </p>
              <p>
                <strong>Smile:</strong> {compound.SMILES || "N/A"}
              </p>
              <p>
                <strong>InChi:</strong> {compound.InChI || "N/A"}
              </p>
              <p>
                <strong>Charge:</strong> {compound.Charge || "N/A"}
              </p>
              <p>
                <strong>Hydrogen Bond Acceptor:</strong>{" "}
                {compound.HBondAcceptorCount || "N/A"}
              </p>
              <p>
                <strong>Hydrogen Bond Donor:</strong>{" "}
                {compound.HBondDonorCount || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {description || "N/A"}
              </p>
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.CID}`}
                target="_blank"
                rel="noreferrer"
                className="bg-primary dark:bg-secondary dark:text-primary mt-4 inline-block w-fit rounded px-4 py-2 text-white hover:opacity-80"
              >
                View Full PubChem Record ↗
              </a>
            </div>

            <div className="flex flex-1 justify-center">
              <img
                src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compound.Title}/PNG`}
                alt={compound.name}
                className="border-primary dark:border-secondary h-[250px] w-[250px] rounded-full border-4 object-contain shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
      <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary flex h-fit w-full justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <p className="text-4xl font-bold">Universe of Chemistry</p>
          <span className="max-w-2xl text-justify text-xl">
            ChemVerse is your all-in-one gateway to exploring the incredible
            world of chemistry. Whether you're a student, researcher, or curious
            mind, ChemVerse simplifies complex chemical data into an interactive
            and intuitive experience. <br /> <br /> We bring chemistry to life
            by combining science, search, and fun — all in one platform. <br />
            <br />
            <NavLink to="about" className="flex items-center font-bold">
              Get to Know ChemVerse Better
              <MdNavigateNext className="text-3xl" />
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
