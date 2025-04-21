import Hero from "../../components/hero/Hero";
import { useRef } from "react";
import * as $3Dmol from "3dmol";

const Model = () => {
  const viewerRef = useRef<HTMLDivElement>(null);

  const fetchModel = async (query) => {
    const res = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/SDF?record_type=3d`,
    );
    const moldelData = await res.text();

    if (!viewerRef.current || !moldelData) return;

    const element = viewerRef.current;
    element.innerHTML = "";

    const isDarkMode = document.documentElement.classList.contains("dark");
    const backgroundColor = isDarkMode ? "rgb(37, 37, 37)" : "white";

    const config = { backgroundColor };
    // const config = { backgroundColor: "white" };
    const viewer = $3Dmol.createViewer(element, config);

    viewer.addModel(moldelData, "sdf");
    viewer.setStyle({}, { stick: {}, sphere: { scale: 0.3 } });
    viewer.zoomTo();
    viewer.render();
  };

  return (
    <div className="flex flex-col items-center">
      <Hero onSearch={fetchModel} variation={"model"} />
      <div className="bg-secondary dark:bg-primary mt-[80px] flex w-full flex-col items-center justify-center p-4">
        <div
          ref={viewerRef}
          className="relative z-0 h-[500px] w-full max-w-[800px] overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Model;
