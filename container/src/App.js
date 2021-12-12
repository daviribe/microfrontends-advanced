import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

// const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container-",
});

export default () => {
  const [isSignIn, setIsSignedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignIn} />
            <Suspense fallback={<Progress />}>
              <Switch>
                {/* <Route exact path="/" component={MarketingLazy} /> */}
                <Route path="/auth">
                  <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </BrowserRouter>
    </div>
  );
};
