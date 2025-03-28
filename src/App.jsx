import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import House from "./House/House";
import PolaroidLine from "./PolaroidLine/PolaroidLine";
import LandingPage from "./landingPage";
import CursorManager from "./House/controllers/cursorManager";

export default function App() {
  return (
    <ThemeProvider>
      <CursorManager>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/house" element={<House />} /> */}
            <Route path="/polaroid" element={<PolaroidLine />} />
          </Routes>
        </BrowserRouter>
      </CursorManager>
    </ThemeProvider>
  );
}
