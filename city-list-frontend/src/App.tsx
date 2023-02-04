import React from "react";
import "./App.css";
import { CityListTable } from "./components/CityTable/CityListTable";
import { Header } from "./components/Common/CommonComponents";

function App() {
  return (
    <div className="App">
      <Header text="City List" />
      <CityListTable />
    </div>
  );
}
export default App;
