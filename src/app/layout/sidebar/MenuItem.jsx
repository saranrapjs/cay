import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import color from 'color';

@Radium
class MenuItem extends React.Component {
  render() {
    return (
      <li style={styles.base}>
        <Link style={styles.link} to={this.props.target} activeStyle={styles.base[':hover']}>
          <span style={ styles.icon }>{this.props.icon}</span>
          <span>{this.props.name}</span>
        </Link>
      </li>
    );
  }
}

const styles = {
  base: {
    lineHeight: '55px',
    height: 'auto',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: color('#F77160').darken(0.1).hexString()
    },
  },
  link: {
    color: 'white',
    height: '55px',
    lineHeight: '55px',
    padding: '0px 20px 0px 15px',
    display: 'block',
    textDecoration: 'none',
    fontSize: '12pt'
  },
  icon: {
    width: '30px',
    textAlign: 'center',
    display: 'inline-block',
    fontSize: '14pt'
  }
};

export default MenuItem;
