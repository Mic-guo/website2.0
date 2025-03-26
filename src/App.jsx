import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./landingPage";
import PolaroidLine from "./PolaroidLine/PolaroidLine";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/polaroid" element={<PolaroidLine />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
