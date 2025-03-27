import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import House from "./House/House";
import PolaroidLine from "./PolaroidLine/PolaroidLine";
import LandingPage from "./landingPage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/polaroid" element={<PolaroidLine />} />
          <Route path="/house" element={<House />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
