import React from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import settings from '../settings';

import Card from '../components/cards/Card';
import CardHeader from '../components/cards/CardHeader';
import TextField from '../components/forms/TextField';
import Button from '../components/Button';

@connect(state => {
  return state.auth;
})
@Radium
class Login extends React.Component {
  render() {
    const {dispatch} = this.props;

    return (
      <div style={styles.base}>
        <Card style={styles.loginModal}>
          <CardHeader title="Sign in" />
          <div style={styles.container}>
            <TextField style={styles.textInput} label="Username / Email Address" />
            <TextField
              style={styles.textInput}
              label="Password"
              type="password"
              error="A password is required" />
            <Button style={styles.loginButton} category="primary">SIGN IN</Button>
            <hr />
            <p>Or connect with</p>
            <Button style={styles.loginButton} category="primary">SSO</Button>
          </div>
        </Card>
      </div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: settings.lighterGrey,
    display: 'flex',
    height: window.innerHeight
  },
  loginModal: {
    margin: 'auto'
  },
  container: {
    paddingTop: 0,
    paddingRight: 40,
    paddingBottom: 40,
    paddingLeft: 40
  },
  textInput: {
    display: 'block'
  },
  loginButton: {
    marginTop: 32,
    marginBottom: 25
  }
}

export default Login;