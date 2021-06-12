import React, { createContext, useReducer } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { ChangePro } from "./components/ChangePro";
// import { Errorpage } from "./components/Errorpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const userContext = createContext();


const App = () => {

  // Reducer Function 
  const initialstate = null;
  const reducer = (userstate , action) => {
    if (action.type === "USER") {
      return action.payload;
    }
    return userstate;
  }

  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/changePro">
              <ChangePro />
            </Route>
            {/* <Route>
              <Errorpage />
            </Route> */}
          </Switch>
        </Router>
      </userContext.Provider>
    </>
  );
};

export default App;
