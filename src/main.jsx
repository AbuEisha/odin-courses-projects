import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <MainContent />
  </StrictMode>
);
