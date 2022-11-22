import "./App.css";
import babyNames from "./BabyNamesData.json";

function App() {
  return (
    <div className="App">
      <div className="nameContainer">
        <div>
          {babyNames
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((x, i) => {
              let color = (x.sex==='m')?'info':'danger'
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