/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import initialState from "../../config/initialState";

import { Header, Footer } from "./components/common";
import { LeftSidebar, RightSidebar } from "./components/layouts";

import * as pages from "./components/pages";

// Configure redux with redux-thunk and dev tools
const middleware = [ReduxThunk];
const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(...middleware),
  // Required! Enable Redux DevTools with the monitors you chose

  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);


const store = createStore(rootReducer, initialState, enhancer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="wrapper">
            <div id="react-burger-container">
              <Header />
              <LeftSidebar pageWrapId="react-burger-page-wrap" width={280} className="left-nav" />
              <RightSidebar
                pageWrapId="react-burger-page-wrap"
                width={375}
                right
              />
              <div id="react-burger-page">
                <Switch>
                  <Route path="/" exact component={pages.Home} />
                  <Route path="/login" exact component={pages.Login} />
                  <Route path="/signup" exact component={pages.SignUp} />
                  <Route path="/sandbox" exact component={pages.SandBox} />
                  <Route path="/vehicles/add" exact component={pages.AddVehicle} />
                  
                  <Route component={pages.NoMatch} />
                </Switch>
              </div>
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
