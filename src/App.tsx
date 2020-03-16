import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route path="/user/:id" component={UserDetails} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
