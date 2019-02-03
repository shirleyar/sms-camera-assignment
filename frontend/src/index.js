import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CameraOpener from './components/cameraOpener';
import NotFound from './components/NotFound'
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

const routing = (
  <Router>
    <main>
      <Switch>
        <Route exact path={'/'} component={App}/>
        <Route path={'/cam'} component={CameraOpener}/>
        <Route component={NotFound}/>
      </Switch>
    </main>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
