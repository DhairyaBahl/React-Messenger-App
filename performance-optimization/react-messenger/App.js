import React, { createContext } from "react";
import { RecoilRoot } from "recoil";

//dev
import RecoilLogger from "recoil-logger";


//Components
import Home from "./components/Home";

const savedTheme = getTheme();

export const ThemeContext = createContext(savedTheme);

const App = () => {
  const [theme, toggleTheme] = useTheme(savedTheme);
  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <RecoilRoot>
          <RecoilLogger />
          <Home />
        </RecoilRoot>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;