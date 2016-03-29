import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from './layout/Flex';
import { connect } from 'react-redux';
import {Link} from 'react-router';
// import { FOO } from '../actions';
import Page from 'app/layout/Page';
import {fetchQuerysetsIfNotFetched} from 'groups/GroupActions';
// import Sentence from '../components/Sentence';
import ContentHeader from 'components/ContentHeader';

import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import MdEdit from 'react-icons/lib/md/edit';


@connect(state => state.groups)
@Radium
class SeeAllGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  componentWillMount() {
    // redirect user to /login if they're not logged in
    //   TODO: refactor: pass in a function that calculates auth state
    if (window.requireLogin && !this.props.authorized) {
      let {router} = this.context;
      return router.push('/login');
    }

    this.props.dispatch(fetchQuerysetsIfNotFetched());
  }
  getStyles() {
    return {
      base: {

      }
    };
  }
  renderGroups() {
    // console.log(this.props);
    const groups = this.props.querysets.map((group, i) => {

      return (
        <div style={styles.groupRow} key={i}>
          <h3 style={ styles.groupName }>{group.name}</h3>
          <p style={ styles.groupDescription }>{group.desc}</p>
          <div style={styles.actionsContainer}>
            <Link
              style={styles.actionLink}
              to={`/group/${group.name}`}><MdRemoveRedEye /></Link>
            <span style={ [ styles.actionLink, styles.disabledAction ] }><MdEdit /></span>
          </div>
        </div>
      );
    });
    return groups;
  }
  render() {
    return (
    <Page>
      <div style={[
        styles.base,
        this.props.style
      ]}>
        <ContentHeader title={ window.L.t('User groups') } subHeader={ window.L.t('Create, edit, and view groups of users') } />
        
        <div style={ styles.groupContainer }>
          <div style={styles.groupHeader}>
            <div style={ styles.nameHeader }>Group Name</div>
            <div style={ styles.descriptionHeader }>Group Description</div>
          </div>
          {this.renderGroups()}
        </div>

      </div>

    </Page>
    );
  }
}

export default SeeAllGroups;

const styles = {
  groupContainer: {
    background: '#f7f7f7',
    marginTop: '20px'
  },
  groupRow: {
    display: 'flex',
    margin: '5px 0',
    padding: '10px 0',
    background: 'white'
  },
  groupName: {
    width: '400px',
    minWidth: '400px',
    padding: '20px',
    fontSize: '12pt'
  },
  groupDescription: {
    flexGrow: '2',
    padding: '20px',
    fontSize: '12pt'
  },
  sentenceHeading: {
    margin: '10px 0px',
    textTransform: 'uppercase',
    fontWeight: 500
  },
  actionsContainer: {
    marginTop: 20,
    width: '100px',
    minWidth: '100px',
    flexShrink: 1
  },
  actionLink: {
    marginRight: 5,
    color: 'black',
    background: '#e9e9e9',
    width: '40px',
    height: '40px',
    display: 'inline-block',
    fontSize: '20px',
    textAlign: 'center',
    lineHeight: '40px',
    borderRadius: '4px'
  },
  disabledAction: {
    color: '#888888',
    opacity: '.5'
  },
  groupHeader: {
    background: '#e9e9e9',
    display: 'flex',
    padding: '20px'
  },
  nameHeader: {
    width: '400px',
    minWidth: '400px'
  }

};

