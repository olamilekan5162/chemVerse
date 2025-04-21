import Hero from "../../components/hero/Hero";
import { useRef, useState } from "react";
import * as $3Dmol from "3dmol";

const Model = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const viewerRef = useRef<HTMLDivElement>(null);

  const fetchModel = async (query) => {
    setLoading(true);
    setError("");
    setSearch(query);
    try {
      const res = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/SDF?record_type=3d`,
      );

      if (!res.ok) {
        throw new Error("Compound model not found");
      }

      const moldelData = await res.text();

      if (!viewerRef.current || !moldelData) return;

      const element = viewerRef.current;
      element.innerHTML = "";

      // const isDarkMode = document.documentElement.classList.contains("dark");
      // const backgroundColor = isDarkMode ? "rgb(37, 37, 37)" : "white";

      // const config = { backgroundColor };
      const config = { backgroundColor: "ash" };
      const viewer = $3Dmol.createViewer(element, config);

      viewer.addModel(moldelData, "sdf");
      viewer.setStyle({}, { stick: {}, sphere: { scale: 0.3 } });
      viewer.zoomTo();
      viewer.render();
    } catch (e) {
      console.log(e);
      setError("Compound model not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Hero onSearch={fetchModel} variation={"model"} />
      {loading && (
        <div className="text-primary dark:text-secondary mt-4 animate-pulse text-center text-xl">
          Searching for Compound 3d Model
        </div>
      )}

      {error && (
        <p className="mt-4 text-lg font-medium text-red-500">{error}</p>
      )}

      <div className="bg-secondary dark:bg-primary mt-[80px] flex w-full flex-col items-center justify-center p-4">
        <h1 className="text-primary dark:text-secondary mb-4 text-2xl font-extrabold">
          {search.toUpperCase()} 3D MODEL
        </h1>
        <div
          ref={viewerRef}
          className="relative z-0 h-[700px] w-full max-w-[800px] overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Model;
