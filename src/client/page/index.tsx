import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import * as stores from '../store'
import App from './App';

import './common.pcss'

ReactDOM.render(<Provider {...stores}>
    <App/>
  </Provider>,
  document.getElementById('app'));
