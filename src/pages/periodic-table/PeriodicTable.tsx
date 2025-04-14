import { useEffect, useState } from "react";
import ElementModal from "../../components/element-modal/ElementModal";

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [isElementModalOpen, setIsElementModalOpen] = useState(false);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch("https://periodictable.p.rapidapi.com/", {
          headers: {
            "x-rapidapi-host": "periodictable.p.rapidapi.com",
            "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setElements(data);
      } catch (err) {
        setError("Failed to fetch periodic table data:" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  const onElementClick = (el) => {
    setSelectedElement(el);
    setIsElementModalOpen(true);
  };

  const onModalClose = () => {
    setIsElementModalOpen(false);
  };

  const getColor = (category) => {
    if (!category) return "bg-gray-300";
    if (category.includes("alkali")) return "bg-yellow-300";
    if (category.includes("alkaline")) return "bg-green-300";
    if (category.includes("transition")) return "bg-blue-300";
    if (category.includes("halogen")) return "bg-pink-300";
    if (category.includes("noble")) return "bg-purple-300";
    return "bg-gray-200";
  };

  return (
    <div className="bg-secondary dark:bg-primary text-primary relative mt-[100px] flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 className="dark:text-secondary text-center text-3xl font-bold">
        🧪 The Periodic Table
      </h1>
      {loading && <p className="text-center">Loading elements...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid w-7xl grid-cols-18 justify-center gap-1">
        {elements.map((el) => (
          <div
            key={el.atomicNumber}
            onClick={() => onElementClick(el)}
            className={`dark:border-secondary cursor-pointer rounded border p-2 text-center text-sm shadow ${getColor(el.groupBlock)} transition-all hover:scale-105`}
            title={el.name}
          >
            <div className="text-lg font-bold">{el.symbol}</div>
            <div className="text-xs">{el.atomicNumber}</div>
          </div>
        ))}
      </div>
      {isElementModalOpen && (
        <ElementModal
          selectedElement={selectedElement}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};
export default PeriodicTable;
