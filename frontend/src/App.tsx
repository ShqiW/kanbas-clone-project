
import React from "react";
import Labs from "./Labs";
import Kanbas from "./Kanbas";

import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          {/* <Route path="/" element={<Navigate to="Labs" />} /> */}
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;