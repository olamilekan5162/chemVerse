import React from "react";
import { Button } from "flowbite-react";
import { CiSearch } from "react-icons/ci";

const Hero = () => {
  return (
    <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary mt-[100px] flex h-[400px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl font-bold">
          Explore a universe of chemistry data
        </p>
        <span>
          — search for compounds, discover drugs, <br /> and visualize atomic
          and molecular structures --
        </span>
        <form action="">
          <input type="text" placeholder="search for elemet, drugs ..." />
          <Button type="submit">
            <CiSearch />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
