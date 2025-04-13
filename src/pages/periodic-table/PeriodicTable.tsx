import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Hash, Ruler, Zap, Calendar, Info, X } from "lucide-react";

export default function PeriodicTable() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);

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
        setError("Failed to fetch periodic table data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

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
    <div className="bg-secondary dark:bg-primary text-primary relative mt-[100px] min-h-screen p-6">
      <h1 className="dark:text-secondary my-16 text-center text-3xl font-bold">
        🧪 The Periodic Table
      </h1>
      {loading && <p className="text-center">Loading elements...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="mx-auto grid max-w-7xl grid-cols-18 justify-center gap-1">
        {elements.map((el) => (
          <div
            key={el.atomicNumber}
            onClick={() => setSelectedElement(el)}
            className={`cursor-pointer rounded border p-2 text-center text-sm shadow ${getColor(el.groupBlock)} transition-all hover:scale-105`}
            title={el.name}
          >
            <div className="text-lg font-bold">{el.symbol}</div>
            <div className="text-xs">{el.atomicNumber}</div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedElement && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedElement(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              >
                <X />
              </button>

              <h2 className="mb-1 text-center text-3xl font-bold text-blue-800">
                {selectedElement.name}
              </h2>
              <p className="mb-4 text-center text-sm text-gray-600 italic">
                {selectedElement.groupBlock}
              </p>

              <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Atom size={18} /> <strong>Symbol:</strong>{" "}
                  {selectedElement.symbol}
                </div>
                <div className="flex items-center gap-2">
                  <Hash size={18} /> <strong>Atomic Number:</strong>{" "}
                  {selectedElement.atomicNumber}
                </div>
                <div className="flex items-center gap-2">
                  <Ruler size={18} /> <strong>Atomic Mass:</strong>{" "}
                  {selectedElement.atomicMass}
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={18} /> <strong>Configuration:</strong>{" "}
                  {selectedElement.electronicConfiguration}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} /> <strong>Discovered:</strong>{" "}
                  {selectedElement.yearDiscovered}
                </div>
                <div className="flex items-center gap-2">
                  <Info size={18} /> <strong>Standard State:</strong>{" "}
                  {selectedElement.standardState}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
