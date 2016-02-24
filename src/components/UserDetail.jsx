import React from 'react';
import Radium from 'radium';

import settings from '../settings';
import {connect} from 'react-redux';

import {fetchAllTags, clearUserDetailComments} from '../actions';

import Avatar from './Avatar';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import Stats from './stats/Stats';
import Stat from './stats/Stat';
import Card from './cards/Card';
import Heading from './Heading';
import Tagger from './forms/Tagger';

import CommentDetailList from './CommentDetailList';

@connect(state => state.pipelines)
@Radium
export default class UserDetail extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchAllTags());
  }

  componentWillUpdate() {
    this.tags = [];
  }

  render() {

    var tagger = this.props.tags ?
      <div style={ styles.tags }>
        <Tagger tagList={ this.props.tags } tags={ this.tags } freeForm={ false } type="user" id={ this.props.selectedUser._id } />
      </div>
    : null;

    return (
      <Card style={[styles.base, this.props.style]}>
        <Heading size="medium">{this.props.user_name}</Heading>
        <div style={styles.topPart}>
          <Avatar style={styles.avatar} src={this.props.avatar || ''} size={200} />
          <Stats style={styles.stats}>
            <Stat term="Status" description="subscriber" />
            <Stat term="Last Login" description={new Date().toISOString()} />
            <Stat term="Member Since" description={new Date().toISOString()} />
            <Stat term="Warnings" description="0" />
            { tagger }
          </Stats>
        </div>
        <Tabs initialSelectedIndex={0} style={styles.tabs}>
          <Tab title="About">
            {
              this.props.loadingUserComments ?
                'Loading Comments...' :
                (
                  <CommentDetailList
                    user={this.props.selectedUser}
                    comments={this.props.userDetailComments} />
                )
            }
          </Tab>
          <Tab title="Activity">Tab Bravo Content</Tab>
          <Tab title="Messages">Tab Charlie Content</Tab>
        </Tabs>
      </Card>
    );
  }
}

const styles = {
  base: {
    borderTopColor: settings.primaryColor,
    paddingLeft: 10,
    paddingRight: 10
  },
  topPart: {
    display: 'flex',
    marginBottom: 10
  },
  avatar: {
    marginRight: 10
  },
  stats: {
    flex: 1
  },
  tabs: {
    clear: 'both'
  },
  tags: {
    clear: 'both',
    paddingTop: '20px'
  }
};
