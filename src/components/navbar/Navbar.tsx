import { Link, NavLink } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";

import logo from "/logo.svg";
const Navbar = () => {
  return (
    <div className="bg-secondary text-primary dark:bg-primary dark:text-secondary fixed top-0 right-0 left-0 z-50 flex h-[100px] flex-row justify-between px-[40px] py-3">
      <Link to="#" className="flex flex-row items-center justify-center gap-3">
        <img src={logo} alt="logo" className="h-auto w-[50px]" />
        <h1 className="text-5xl font-extrabold">ChemVerse</h1>
      </Link>

      <div className="flex flex-row items-center justify-center gap-[60px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "border-b-primary dark:border-b-secondary border-b-6 pb-2 text-2xl font-normal"
              : "hover:text-primary-hover dark:hover:text-bg-color text-2xl font-normal"
          }
        >
          Compounds
        </NavLink>

        <NavLink
          to="model"
          className={({ isActive }) =>
            isActive
              ? "border-b-primary dark:border-b-secondary border-b-6 pb-2 text-2xl font-normal"
              : "hover:text-primary-hover dark:hover:text-bg-color text-2xl font-normal"
          }
        >
          3d Models
        </NavLink>

        <NavLink
          to="drugs"
          className={({ isActive }) =>
            isActive
              ? "border-b-primary dark:border-b-secondary border-b-6 pb-2 text-2xl font-normal"
              : "hover:text-primary-hover dark:hover:text-bg-color text-2xl font-normal"
          }
        >
          Drugs
        </NavLink>

        <NavLink
          to="periodic-table"
          className={({ isActive }) =>
            isActive
              ? "border-b-primary dark:border-b-secondary border-b-6 pb-2 text-2xl font-normal"
              : "hover:text-primary-hover dark:hover:text-bg-color text-2xl font-normal"
          }
        >
          Periodic Table
        </NavLink>

        <NavLink
          to="quiz"
          className={({ isActive }) =>
            isActive
              ? "border-b-primary dark:border-b-secondary border-b-6 pb-2 text-2xl font-normal"
              : "hover:text-primary-hover dark:hover:text-bg-color text-2xl font-normal"
          }
        >
          Quiz
        </NavLink>

        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive
              ? "border-b-primary dark:border-b-secondary border-b-6 pb-2 text-2xl font-normal"
              : "hover:text-primary-hover dark:hover:text-bg-color text-2xl font-normal"
          }
        >
          About
        </NavLink>

        <DarkThemeToggle className="text-primary text-4xl" />
      </div>
    </div>
  );
};

export default Navbar;
