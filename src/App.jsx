import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./landingPage";

export default function App() {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
}
