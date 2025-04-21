import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Quiz from "./pages/quiz/Quiz.tsx";
import PeriodicTable from "./pages/periodic-table/PeriodicTable.tsx";
import Drugs from "./pages/drugs/Drugs.tsx";
import About from "./pages/about/About.tsx";
import Model from "./pages/model/Model.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "model",
        element: <Model />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "Periodic-table",
        element: <PeriodicTable />,
      },
      {
        path: "drugs",
        element: <Drugs />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
