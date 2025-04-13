import { useEffect, useState } from "react";
import axios from "axios";

export default function PeriodicTable() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch("https://periodictable.p.rapidapi.com/", {
          headers: {
            "x-rapidapi-host": "periodictable.p.rapidapi.com",
            "x-rapidapi-key":
              "83ccb6233amshf2f2f5ae05304abp176ae2jsn5151f9b49a42",
          },
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setElements(data);
      } catch (err) {
        setError("Failed to fetch periodic table data");
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
    <div className="bg-secondary dark:bg-primary mt-[100px] min-h-screen p-6">
      <h1 className="text-primary dark:text-secondary my-16 text-center text-4xl font-bold">
        🧪 The Periodic Table
      </h1>
      {loading && <p className="text-center">Loading elements...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="mx-auto grid max-w-7xl grid-cols-18 justify-center gap-1">
        {elements.map((el) => (
          <div
            key={el.atomicNumber}
            className={`rounded border p-2 text-center text-sm shadow ${getColor(el.groupBlock)} transition-all hover:scale-105`}
            title={el.name}
          >
            <div className="text-lg font-bold">{el.symbol}</div>
            <div className="text-xs">{el.atomicNumber}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
