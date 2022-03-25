import { Box } from "@chakra-ui/react";

import Home from "./pages/Home";
import Record from "./pages/Record";
import Preference from "./pages/Preference";
import Render from "./pages/Render";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box w={800} p={10}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
          <Route path="/preference" element={<Preference />} />
          <Route path="/render" element={<Render />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
