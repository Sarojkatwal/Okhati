import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./comp/login.js";
import Homepage from "./comp/homepage.js";
import Register from "./comp/register.js";
import NotFound from "./comp/notFound.js";
import { ProtectedRoute } from "./protectedRoute.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Register} />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/homepage" component={Homepage} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
