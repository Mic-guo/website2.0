import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PolaroidLine from "./PolaroidLine/PolaroidLine";
import LandingPage from "./landingPage";
import CursorManager from "./controllers/cursorManager";
export default function App() {
  return (
    <CursorManager>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/polaroid" element={<PolaroidLine />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CursorManager>
  );
}
