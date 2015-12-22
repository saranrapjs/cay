import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import {fetchUserListIfNotFetched, setFilter, selectUser, fetchUsers} from '../actions';

import Header from '../components/layout/header/header';
import Sidebar from '../components/layout/sidebar/sidebar';
import Trust from '../components/trust';

import settings from '../settings';

@connect(state => {
  return state.userList;
})
@Radium
export default class UserManager extends React.Component {

  // only the first time
  componentWillMount() {
    if (this.props.params.filterId) {
      this.props.dispatch(fetchUserListIfNotFetched(this.props.params.filterId));
    }
  }

  // every time the state is updated
  componentDidUpdate() {

    if (this.props.params.filterId) {
      this.props.dispatch(fetchUserListIfNotFetched(this.props.params.filterId));
    }

  }

  render() {
    const {dispatch} = this.props;

    return (
      <div style={styles}>
        <Header />
        <Sidebar />
        <Trust
          {...this.props}
          onFilterClick={id => {
            dispatch(setFilter(id));
            dispatch(fetchUsers('foo=bar'));
          }}
          onUserClick={user => dispatch(selectUser(user))} />
      </div>
    );
  }
}

var styles = {
  backgroundColor: settings.coralPink
}
