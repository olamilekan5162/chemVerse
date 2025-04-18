import { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";

const Drugs = () => {
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const myDrug = async () => {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": "konviere-drugsapi.p.rapidapi.com",
          "x-rapidapi-key":
            "83ccb6233amshf2f2f5ae05304abp176ae2jsn5151f9b49a42",
        },
      };

      try {
        const res = await fetch(
          "https://konviere-drugsapi.p.rapidapi.com/konviere/drugs/getDrugInfoByDrgNm/paracetamol",
          options,
        );

        if (!res.ok) throw new Error();
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    myDrug();
  }, []);

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
      </div>
    </div>
  );
};

export default Drugs;
