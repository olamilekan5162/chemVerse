import { useState } from "react";
import Hero from "../../components/hero/Hero";

const Drugs = () => {
  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDrugInfo = async (drugName) => {
    setLoading(true);
    setError(null);
    setDrugInfo(null);

    try {
      // Fetch from both the Label and NDC endpoints
      const [labelResponse, ndcResponse] = await Promise.all([
        fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${drugName}"&limit=1`,
        ),
        fetch(
          `https://api.fda.gov/drug/ndc.json?search=brand_name:"${drugName}"&limit=1`,
        ),
      ]);

      // Check if both responses are OK
      if (!labelResponse.ok) {
        throw new Error(`Label API error: ${labelResponse.status}`);
      }

      if (!ndcResponse.ok) {
        throw new Error(`NDC API error: ${ndcResponse.status}`);
      }

      // Parse the JSON responses
      const labelData = await labelResponse.json();
      const ndcData = await ndcResponse.json();

      // Check if we have results
      if (labelData.results?.length === 0 && ndcData.results?.length === 0) {
        throw new Error("No drug information found");
      }

      // Extract label data (clinical info)
      const labelResult = labelData.results?.[0] || {};
      const openFdaLabel = labelResult.openfda || {};

      // Extract NDC data (physical properties)
      const ndcResult = ndcData.results?.[0] || {};

      // Combine the data
      const combinedDrugInfo = {
        name: openFdaLabel.brand_name?.[0] || drugName,
        synonym: openFdaLabel.generic_name?.[0],
        rxcui: openFdaLabel.rxcui?.[0],

        // Clinical information from label
        indications_and_usage:
          labelResult.indications_and_usage?.[0]?.substring(0, 150) + "...",
        mechanism_of_action:
          labelResult.mechanism_of_action?.[0]?.substring(0, 150) + "...",
        drug_interactions:
          labelResult.drug_interactions?.[0]?.substring(0, 150) + "...",
        boxed_warnings: !!labelResult.boxed_warning,

        // Physical properties from NDC
        active_ingredients: ndcResult.active_ingredients,
        dosage_form: ndcResult.dosage_form,
        route: ndcResult.route,
        pharmaceutical_classes: openFdaLabel.pharm_class_cs,
      };

      setDrugInfo(combinedDrugInfo);
    } catch (err) {
      console.error("Error fetching drug data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Hero onSearch={fetchDrugInfo} isDashboard={false} />

      <div className="text-primary dark:text-secondary flex flex-col items-center justify-start p-4">
        {loading && (
          <div className="text-primary dark:text-secondary animate-pulse text-center text-xl">
            Searchinig for Drug
          </div>
        )}

        {error && (
          <p className="mt-4 text-lg font-medium text-red-500">{error}</p>
        )}

        {drugInfo && (
          <div className="dark:bg-primary text-primary dark:text-secondary flex flex-col gap-10 rounded-xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] md:flex-row">
            <div className="flex flex-1 flex-col gap-4">
              <div className="mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
                <h2 className="text-3xl font-bold capitalize">
                  {drugInfo.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {drugInfo.synonym || "Generic Name"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                    Clinical Information
                  </h3>
                  <p className="mb-2">
                    <strong>Indications:</strong>{" "}
                    {drugInfo.indications_and_usage || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Mechanism:</strong>{" "}
                    {drugInfo.mechanism_of_action || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Interactions:</strong>{" "}
                    {drugInfo.drug_interactions || "N/A"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                    Composition Details
                  </h3>
                  <p className="mb-2">
                    <strong>Active Ingredients:</strong>{" "}
                    {drugInfo.active_ingredients?.[0]?.name || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Dosage Form:</strong>{" "}
                    {drugInfo.dosage_form || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Route:</strong> {drugInfo.route || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  Additional Information
                </h3>
                <p className="mb-2">
                  <strong>RxCUI:</strong> {drugInfo.rxcui || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Drug Class:</strong>{" "}
                  {drugInfo.pharmaceutical_classes?.[0] || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Warnings:</strong>{" "}
                  {drugInfo.boxed_warnings ? "⚠️ Yes" : "None"}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={`https://dailymed.nlm.nih.gov/dailymed/search.cfm?labeltype=all&query=${drugInfo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary dark:bg-secondary dark:text-primary inline-block rounded px-4 py-2 text-white hover:opacity-80"
                >
                  View Full Details ↗
                </a>
                <button className="rounded border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800">
                  Save Information
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="mb-4 flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                {/* Placeholder for molecular structure */}
                <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-dashed border-blue-300 dark:border-blue-700">
                  <span className="text-6xl text-blue-400">
                    {drugInfo.name?.charAt(0) || "Rx"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex w-full justify-center">
                <div className="inline-flex rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  <span className="mr-1">FDA Approved</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
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
