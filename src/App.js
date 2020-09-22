import React, { Component } from "react";
import "./App.css";
import AddQuestion from "./component/AddQuestion";
import QuestionsListComponent from "./component/QuestionsListComponent";
import AddMulti from "./component/AddMulti";
import Login from "./component/Login";
import Navbar from "./component/navbar";
import UserQuestions from "./component/UserQuestions";
import { BrowserRouter as Router } from "react-router-dom";

import { Link, Switch, Route } from "react-router";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Route path="/" component={App}>
            <Route path="/Questions" component={QuestionsListComponent} />
            <Route path="/AddQuestions" component={AddQuestion} />
            <Route path="/AddMulti" component={AddMulti} />
            <Route path="/Login" component={Login} />
            <Route path="/UserQuestions" component={UserQuestions} />
          </Route>
        </Router>
        
      </div>
    );
  }
}
export default App;
