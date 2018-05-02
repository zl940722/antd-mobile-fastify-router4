import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react'
import { routes } from './Routes'

@observer
export default class App extends Component<any, any> {

  createRoute = (item, index) => {
    return <Route key={item.path || index} {...item} />;
  };

  render() {
    return (
      <Router>
        <Switch>
          <div>{routes.map(this.createRoute)}</div>
        </Switch>
      </Router>
    )
  }
}

