import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorProvider from "./context/ErrorProvider";

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={UserList} />
            <Route path="/user/:username" component={UserDetails} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      </ErrorProvider>
    </ErrorBoundary>
  );
};

export default App;
