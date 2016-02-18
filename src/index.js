// React Core
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { browserHistory, Router, Route } from 'react-router';
// React Redux
import { Provider } from 'react-redux';
// Redux Devtools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// React-Intl 
import {IntlProvider} from 'react-intl';
require('./supportedLocales.js');
import messages from './messages';

var locale = navigator.language.split('-');
locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;

var strings = messages[locale] ? messages[locale] : messages['en-US'];
strings = Object.assign(messages['en-US'], strings);

import configureStore from './store';

import Dashboard from './containers/Dashboard';
import UserManager from './containers/UserManager';
import Login from './containers/Login';
import DataExplorer from './containers/DataExplorer';

const store = configureStore();

require('../css/reset.css');
require('../css/global.css');

require('../fonts/glyphicons-halflings-regular.woff');

class Root extends React.Component {
  render() {

    if (process && process.env.NODE_ENV !== 'production') {
      var debug = (
        <DebugPanel top right bottom>
          <DevTools store={store} visibleOnLoad={false} monitor={LogMonitor} />
        </DebugPanel>
      );
    }

    var innerRoutes = (
      <Route>
        <Route path="user-manager/:filterId/:userId" component={UserManager}/>
        <Route path="user-manager/:filterId" component={UserManager}/>
        <Route path="user-manager" component={UserManager}/>
        <Route path="explore" component={DataExplorer}/>
      </Route>
    );

    return (
      <div>
        <IntlProvider messages={strings} locale="de-DE">
          <Provider store={store}>
            <Router history={browserHistory}>
              <Route path="login" component={Login}/>
              <Route path="/" component={Dashboard}>
                { innerRoutes }
              </Route>
              <Route path=":lang">
                {innerRoutes}
              </Route>
            </Router>
          </Provider>
        </IntlProvider>
        {debug}
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
