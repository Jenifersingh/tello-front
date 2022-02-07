import { useReducer } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import logo from "./logo.svg";
import "./App.css";
import { Main } from "./main";
import { Context } from "./store/context";
import { reducer } from "./store/reducer";
import { SignIn, SignUp } from "./auth";

let initialData = {
  stepCards: {},
  stepOrder: [],
  project: {},
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
    </Context.Provider>
  );
}

export default App;
