// Préparer structure de base de l'application pour les stagiaires

import Countries from "./components/Countries/Countries";
import Header from "./components/Header/Header";
import IdeApp from "./components/Ide/IdeApp";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import Slider from "./components/Slider/Slider";
import Weather from "./components/Weather/Weather";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Slider />
      <Weather />
      <Countries />
      <IdeApp />
      <Pomodoro />

      {/* autres applis à venir... */}
      {/* exos à intégrer pour les stagiaires */}
    </div>
  );
}

export default App;
