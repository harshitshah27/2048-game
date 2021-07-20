import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store, { history } from "./store";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import "./Styles.css";

const GameController = React.lazy(() => import("Components/GameController"));

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading....</div>}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={GameController} />
            </Switch>
          </div>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
