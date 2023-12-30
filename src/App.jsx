import Countries from "./components/Countries/Countries";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import Weather from "./components/Weather/Weather";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Slider />
      <Weather />
      <Countries />
      {/* autres applis à venir... */}
    </div>
  );
}

export default App;
