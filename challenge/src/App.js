import "./App.css";
import babyNames from "./BabyNamesData.json";
import { useState } from "react";

let favoriteNames = [];

function App() {
  let [data, dataSet] = useState(
    babyNames.sort((a, b) => (a.name > b.name ? 1 : -1))
  );

  const [favoriteNamesArray, setFavoriteNamesArray] = useState(favoriteNames);
  const addToFavorite = (e) => {
    let clickedName = e.target.textContent;
    favoriteNames = [
      ...favoriteNames,
      data.find((x) => {
        return x.name === clickedName;
      }),
    ];
    data = data.filter((x) => {
      return x.name !== clickedName;
    });
    setFavoriteNamesArray(favoriteNames);
    dataSet(data);
  };

  const rmvFromFavorite = (e) => {
    let clickedName = e.target.textContent;

    data = [
      ...data,
      favoriteNames.find((x) => {
        return x.name === clickedName;
      }),
    ];

    favoriteNames = favoriteNames.filter((x) => {
      return x.name !== clickedName;
    });

    setFavoriteNamesArray(favoriteNames);
    dataSet(data.sort((a, b) => (a.name > b.name ? 1 : -1)));
  };

  const search = () => {
    const filteredData = data.filter((x) => {
      return x.name
        .toLowerCase()
        .indexOf(document.getElementById("searchInput").value.toLowerCase()) >
        -1
        ? x
        : "";
    });
    dataSet(filteredData);
  };
  const filterNamesBySex = (e) => {
    if (
      !window.confirm(
        "By filtering names based on gender all favourite name(s) will removed"
      )
    )
      return;
    favoriteNames = [];
    setFavoriteNamesArray(favoriteNames);
    let clickedButton = e.target.id;
    let filteredNames = babyNames;
    if (clickedButton === "B")
      filteredNames = filteredNames.filter((x) => x.sex === "m");
    else if (clickedButton === "G")
      filteredNames = filteredNames.filter((x) => x.sex === "f");
    dataSet(filteredNames.sort((a, b) => (a.name > b.name ? 1 : -1)));
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
        <button id="A" onClick={filterNamesBySex}>
          All
        </button>
        <button id="G" className="bg-danger" onClick={filterNamesBySex}>
          Girls
        </button>
        <button id="B" className="bg-info" onClick={filterNamesBySex}>
          Boys
        </button>
      </div>

      <div className="nameContainer">
        <section className="favorite">
          <p>Favorite:</p>
          {favoriteNamesArray.map((x, i) => {
            let color = x.sex === "m" ? "info" : "danger";
            return (
              <p
                onClick={rmvFromFavorite}
                key={i}
                value={x.name}
                className={`name bg-${color} m-2 lead align-middle`}
              >
                {x.name}
              </p>
            );
          })}
        </section>
        <hr />
        <div>
          {data.map((x, i) => {
            let color = x.sex === "m" ? "info" : "danger";
            return (
              <p
                onClick={addToFavorite}
                key={i}
                value={x.name}
                className={`name bg-${color} m-2 lead align-middle`}
              >
                {x.name}
              </p>
            );
          })}
        </div>
        <hr />
      </div>
    </div>
  );
}

export default App;
//bootstrap align text middle?
