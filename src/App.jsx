import About from "./pages/About";
import Squad from "./pages/Squad";
import News from "./pages/News";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import LastResultWidget from "./components/LastResultWidget";
import ScrollToTop from "./components/ScrollToTop";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/about" element={<About />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/news" element={<News />} />
        <Route path="/lastresultwidget" element={<LastResultWidget />} />
      </Routes>
    </>
  );
}

export default App;
