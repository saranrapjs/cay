import React from 'react';
import Radium from 'radium';

import {injectIntl} from 'react-intl';

import MenuItem from './MenuItem';

@Radium
class Menu extends React.Component {

  render() {

    const {formatMessage} = this.props.intl;

    return (
      <div>
        <a href="/" style={styles.logo}>Coral Project</a>
        <ul>
          <MenuItem name="Dashboard" target="/" icon="fa-area-chart" />
          <MenuItem name="Explore" target="/explore" icon="fa-bar-chart" />
          <MenuItem name={ formatMessage(this.props.intl.messages["sidebar.user_manager"]) } target="/user-manager" icon="fa-users" />
          <MenuItem name="Settings" target="/settings" icon="fa-cog" />
        </ul>
      </div>
    );
  }
}

var styles = {
  logo: {
    backgroundImage: 'url(/img/logo_white.png)',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 10px',
    color: 'white',
    fontSize: '1em',
    padding: '12px 20px 12px 35px',
    textDecoration: 'none',
    display: 'block'
  }
};

export default injectIntl(Menu);
