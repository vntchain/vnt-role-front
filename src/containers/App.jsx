import React from 'react';
import { Switch, Route } from 'react-router-dom'
import paths from '../utils/paths'

import Login from './Login.jsx'
import Home from './Home.jsx'

function App() {
  return (
    <Switch>
      <Route exact path={paths.login} component={Login} />
      <Route path={paths.home} component={Home} />
    </Switch>
  );
}

export default App 
