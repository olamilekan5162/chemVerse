import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Hero = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };

  return (
    <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary mt-[100px] flex h-[300px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl font-bold">
          Explore a universe of chemistry data
        </p>
        <span className="text-xl">
          — search for compounds, discover drugs, <br /> and visualize atomic
          and molecular structures —
        </span>
        <form
          action="/"
          className="border-primary dark:border-secondary flex w-[60%] flex-row items-center justify-between gap-3 rounded border-2 px-3 py-1"
          onSubmit={handleSearch}
        >
          <input
            className="w-full border-none outline-none"
            type="text"
            placeholder="search for elements, drugs..."
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
  );
};

export default Hero;
