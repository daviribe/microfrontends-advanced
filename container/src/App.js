import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container-",
});

const history = createBrowserHistory();

export default () => {
  const [isSignIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignIn) history.push("/dashboard");
  }, [isSignIn]);

  return (
    <div>
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header
              onSignOut={() => setIsSignedIn(false)}
              isSignedIn={isSignIn}
            />
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/pricing" component={MarketingLazy} />
                <Route path="/auth">
                  <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/dashboard">
                  {!isSignIn && <Redirect to="/" />}
                  <DashboardLazy />
                </Route>
                <Route exact path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </Router>
    </div>
  );
};
