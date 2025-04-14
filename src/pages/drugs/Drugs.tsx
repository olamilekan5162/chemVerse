import React, { useState } from "react";
import Hero from "../../components/hero/Hero";

const Drugs = () => {
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDrugInfo = async (search) => {
    setLoading(true);
    setError(null);
    setDrugInfo(null);

    try {
      const rxcuiRes = await fetch(
        `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${search}`,
      );
      const rxcuiData = await rxcuiRes.json();

      const rxcui = rxcuiData.idGroup?.rxnormId?.[0];
      if (!rxcui) {
        setError("Drug not found");
        return;
      }

      const detailsRes = await fetch(
        `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`,
      );
      const detailsData = await detailsRes.json();

      setDrugInfo(detailsData.properties);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //   const funFacts = [
  //     "Aspirin was originally derived from willow tree bark!",
  //     "Caffeine is the most widely consumed psychoactive substance in the world.",
  //     "Penicillin was discovered by accident!",
  //     "Morphine is named after Morpheus, the Greek god of dreams.",
  //   ];

  return (
    <div className="flex flex-col items-center">
      <Hero onSearch={fetchDrugInfo} isDashboard={false} />

      <div className="text-primary dark:text-secondary flex flex-col items-center justify-start p-4">
        {loading && (
          <div className="mt-8 animate-pulse text-xl text-blue-500">
            Fetching data...
          </div>
        )}

        {error && (
          <p className="mt-4 text-lg font-medium text-red-500">{error}</p>
        )}

        {drugInfo && (
          <div className="dark:bg-primary dark:text-secondary mt-10 w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-2 text-2xl font-semibold text-blue-600">
              {drugInfo.name}
            </h2>
            <p className="mb-2">
              <strong>Synonym:</strong> {drugInfo.synonym || "N/A"}
            </p>
            <p className="mb-2">
              <strong>RxCUI:</strong> {drugInfo.rxcui}
            </p>
            <p className="mb-2">
              <strong>TTY (Type):</strong> {drugInfo.tty}
            </p>
            <p>
              <strong>Language:</strong> {drugInfo.language || "en"}
            </p>
          </div>
        )}

        {/* <div className="mt-16 w-full max-w-2xl rounded bg-yellow-100 p-6 text-yellow-800 shadow dark:bg-yellow-900 dark:text-yellow-200">
          <h3 className="mb-2 text-xl font-bold">💡 Did You Know?</h3>
          <p className="text-md italic">
            {funFacts[Math.floor(Math.random() * funFacts.length)]}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Drugs;
