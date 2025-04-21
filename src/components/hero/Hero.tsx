import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Hero = ({ onSearch, variation }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search.trim());
      setSearch("");
    }
  };

  return (
    <>
      {variation === "dashboard" && (
        <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary mt-[100px] flex h-[300px] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-4xl font-bold">
              Explore a universe of chemistry data
            </p>
            <span className="text-center text-xl">
              — search for elements, compounds, <br /> and visualize atomic and
              molecular structures —
            </span>
            <form
              onSubmit={handleSearch}
              className="border-primary dark:border-secondary flex w-[60%] flex-row items-center justify-between gap-3 rounded border-2 px-3 py-1"
            >
              <input
                className="w-full border-none bg-transparent outline-none"
                type="text"
                placeholder="Search for elements, compounds..."
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="hover:cursor-pointer">
                <CiSearch className="text-2xl" />
              </button>
            </form>
          </div>
        </div>
      )}
      {variation === "drug" && (
        <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary mt-[100px] flex h-[250px] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-4xl font-bold">Explore Drug data</p>
            <span className="text-xl">
              — search for drugs, discover drugs —
            </span>
            <form
              onSubmit={handleSearch}
              className="border-primary dark:border-secondary flex w-[60%] flex-row items-center justify-between gap-3 rounded border-2 px-3 py-1"
            >
              <input
                className="w-full border-none bg-transparent outline-none"
                type="text"
                placeholder="Search for drugs..."
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="hover:cursor-pointer">
                <CiSearch className="text-2xl" />
              </button>
            </form>
          </div>
        </div>
      )}
      {variation === "model" && (
        <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary mt-[100px] flex h-[250px] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-4xl font-bold">3D MODEL</p>
            <span className="text-xl">— search for compounds 3d models —</span>
            <form
              onSubmit={handleSearch}
              className="border-primary dark:border-secondary flex w-[60%] flex-row items-center justify-between gap-3 rounded border-2 px-3 py-1"
            >
              <input
                className="w-full border-none bg-transparent outline-none"
                type="text"
                placeholder="Search for model..."
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="hover:cursor-pointer">
                <CiSearch className="text-2xl" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
