import { useState } from "react";
import Hero from "../../components/hero/Hero";

const Drugs = () => {
  const [drugLabel, setDrugLabel] = useState(null);
  const [drugNdc, setDrugNdc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDrugInfo = async (drugName) => {
    setLoading(true);
    setDrugLabel(null);
    setDrugNdc(null);
    setError("");

    try {
      const [labelResponse, ndcResponse] = await Promise.all([
        fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${drugName}"&limit=1`,
        ),
        fetch(
          `https://api.fda.gov/drug/ndc.json?search=brand_name:"${drugName}"&limit=1`,
        ),
      ]);

      if (!labelResponse.ok) {
        throw new Error("Drug not found");
      }

      if (!ndcResponse.ok) {
        throw new Error("Drug not found");
      }

      const labelData = await labelResponse.json();
      const ndcData = await ndcResponse.json();

      setDrugLabel(labelData.results[0]);
      setDrugNdc(ndcData.results[0]);
    } catch (err) {
      console.error("Error fetching drug data:", err);
      setError("Drug not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Hero onSearch={fetchDrugInfo} variation={"drug"} />

      <div className="text-primary dark:text-secondary flex flex-col items-center justify-start p-4">
        {loading && (
          <div className="text-primary dark:text-secondary animate-pulse text-center text-xl">
            Searching for Drug
          </div>
        )}

        {error && (
          <p className="mt-4 text-lg font-medium text-red-500">{error}</p>
        )}

        {drugNdc && drugLabel && (
          <div className="dark:bg-primary text-primary dark:text-secondary mt-[80px] flex flex-col gap-10 rounded-xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <div className="flex flex-1 flex-col gap-4">
              <div className="mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
                <h2 className="text-3xl font-bold capitalize">
                  {drugLabel.openfda.brand_name}
                </h2>
                <p className="text-primary dark:text-secondary mt-1 text-xl font-medium">
                  {drugLabel.openfda.generic_name || "Generic Name"}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-bg-color dark:bg-bg-color-dark flex flex-col rounded-lg p-4">
                  <h3 className="text-primary dark:text-secondary mb-2 text-xl font-bold">
                    Clinical Information
                  </h3>
                  <div className="grid grid-cols-3 gap-7 pr-5">
                    <p className="text-justify">
                      <strong>Purpose:</strong> <br />{" "}
                      {drugLabel.purpose || "N/A"}
                    </p>
                    <p className="text-justify">
                      <strong>Indications:</strong> <br />{" "}
                      {drugLabel.indications_and_usage[0].slice(0, 500) +
                        " ..." || "N/A"}
                    </p>
                    <p className="text-justify">
                      <strong>Warning:</strong> <br />{" "}
                      {drugLabel.warnings[0].slice(0, 500) + " ..." || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="bg-bg-color dark:bg-bg-color-dark flex flex-1 flex-col rounded-lg p-4">
                    <h3 className="text-primary dark:text-secondary mb-2 text-xl font-bold">
                      Composition Details
                    </h3>
                    <p className="mb-2">
                      <strong>Active Ingredients:</strong>{" "}
                      {drugNdc.active_ingredients[0].name || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Strenght:</strong>{" "}
                      {drugNdc.active_ingredients[0].strength || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Dosage Form:</strong>{" "}
                      {drugNdc.dosage_form || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Route:</strong> {drugNdc?.route || "N/A"}
                    </p>
                  </div>

                  <div className="bg-bg-color dark:bg-bg-color-dark flex flex-1 flex-col rounded-lg p-4">
                    <h3 className="text-primary dark:text-secondary mb-2 text-xl font-bold">
                      Additional Information
                    </h3>
                    <p className="mb-2">
                      <strong>RxCUI:</strong>{" "}
                      {drugLabel.openfda.rxcui[0] || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Type:</strong>{" "}
                      {drugLabel.openfda.product_type[0] || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Drug Class:</strong>{" "}
                      {drugNdc.pharm_class[0] || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Warnings:</strong>{" "}
                      {drugLabel.warnings ? "⚠️ Yes" : "None"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drugs;
