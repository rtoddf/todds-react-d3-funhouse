import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home'

import Simple01Class from "./Simple/Class/Simple01";
import Simple01Hooks from "./Simple/Hooks/Simple01";
import Simple02Hooks from "./Simple/Hooks/Simple02";

import AlbersUsaClass from "./Maps/Class/Projections/AlbersUsa";
import AlbersUsaHooks from "./Maps/Hooks/Projections/AlbersUsa";
// import SphericalMercatorClass from "./Maps/Class/Projections/SphericalMercator";

// import OrthographicClass from "./Maps/Class/Projections/Orthographic";



class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (<Home />)} />
            <Route exact path="/simple/class/simple01" render={() => (<Simple01Class />)} />
            <Route exact path="/simple/hooks/simple01" render={() => (<Simple01Hooks />)} />
            <Route exact path="/simple/hooks/simple02" render={() => (<Simple02Hooks />)} />

            <Route exact path="/maps/class/projections/albersusa" render={() => (<AlbersUsaClass />)} />
            <Route exact path="/maps/hooks/projections/albersusa" render={() => (<AlbersUsaHooks />)} />
            {/* <Route exact path="/maps/class/projections/sphericalmercator" render={() => (<SphericalMercatorClass />)} />
            <Route exact path="/maps/hooks/projections/sphericalmercator" render={() => (<SphericalMercatorClass />)} />
            <Route exact path="/maps/class/projections/orthographic" render={() => (<OrthographicClass />)} />
            <Route exact path="/maps/hooks/projections/orthographic" render={() => (<OrthographicClass />)} /> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
