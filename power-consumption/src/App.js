import React from "react";
import { Dashboard } from "./screens";
import Data from "./context/Data";

const App = () => (
  <Data>
    <Dashboard />
  </Data>
);

export default App;
