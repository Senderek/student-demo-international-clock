import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ClockList from "./ClockList/ClockList";
import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to={`/${uuidv4()}`} />
      </Route>
      <Route path="/:id" component={ClockList}></Route>
    </Router>
  );
}

export default App;
