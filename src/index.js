import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Search from "./Search";
import "./index.css";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup component={null}>
    <CSSTransition
      key={location.key}
      classNames={location.key === 0 ? "pageSliderLeft" : "pageSliderRight"}
      timeout={1000}
    >
      <div className='route__container'>
        <Switch location={location}>
          <Route path='/' component={App} exact />
          <Route path='/search' component={Search} />
        </Switch>
      </div>
    </CSSTransition>
  </TransitionGroup>
));

ReactDOM.render(
  <BrowserRouter>
    <AnimatedSwitch />
  </BrowserRouter>,
  document.getElementById("root")
);
