import "./App.css";
import babyNames from "./BabyNamesData.json";
import { useState } from "react";

function App() {
  const [data, dataSet] = useState(
    babyNames.sort((a, b) => (a.name > b.name ? 1 : -1))
  );
  const search = () => {
    const filteredData = babyNames.filter((x) => {
      return x.name
        .toLowerCase()
        .indexOf(document.getElementById("searchInput").value.toLowerCase()) >
        -1
        ? x
        : "";
    });
    dataSet(filteredData);
    console.log(filteredData);
  };

  return (
    <div className="App">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="searchInput"
          onInput={search}
        ></input>
      </div>
      <div className="nameContainer">
        <div>
          {data.map((x, i) => {
            let color = x.sex === "m" ? "info" : "danger";
            return (
              <p key={i} className={`name bg-${color} m-2 lead align-middle`}>
                {x.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
//bootstrap align text middle?
