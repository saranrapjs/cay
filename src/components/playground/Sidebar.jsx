import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import TwitterStream from './TwitterStream';

import mediaQueries from '../../playgroundSettings';

import FaTwitter from 'react-icons/lib/fa/twitter';

@connect(state => state.playground)
@Radium
class Sidebar extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  onExpandClick() {
    this.setState({ expanded: !this.state.expanded });
    console.log(this.state.expanded);
  }

  render() {

    var sideBarLinks = this.props.currentSidebarTopic && 
      this.props.topics[this.props.currentSidebarTopic] &&
      this.props.topics[this.props.currentSidebarTopic].links ?
      <div style={ styles.sideBarReferences }>
        <h3 style={ styles.referencesTitle }>Learn more about { this.props.topics[this.props.currentSidebarTopic].title }</h3>
          {
            this.props.topics[this.props.currentSidebarTopic].links.map((link, i) => {
              return (
                  <a key={ i } style={ styles.sideBarLinks } href="{ link.href }">{ link.friendlyName }</a>
              );
            })
          }
      </div>
    : '';

    var sideBarContent = this.props.currentSidebarTopic && this.props.topics[this.props.currentSidebarTopic] ? 
      <div>
        <div style={ styles.sideBarTopic }>
          <h2 style={ styles.sideBarTitle }>{ this.props.topics[this.props.currentSidebarTopic].title }</h2>
          <p style={ styles.sideBarDescription }>{ this.props.topics[this.props.currentSidebarTopic].description }</p>
        </div>
        <div style={ styles.tweets }>
          <span style={ styles.twitterIcon }><FaTwitter /></span> <span style={ styles.twitterTitle }>Join the discussion!</span><br />
          <TwitterStream />
        </div>
        { sideBarLinks }
      </div>
    : 
      <p>
        This area will show you contextual information about the various settings and elements in the playground.
      </p>
    ;
   
    return (
      <div style={ [ styles.sideBar, this.state.expanded ? styles.expandedSidebar : '' ] }>
        <div style={ styles.expandLink } onClick={ this.onExpandClick.bind(this) }>Expand</div>
        { sideBarContent }
      </div>
    );  

  }
}

// same as the @connect decorator above
export default Sidebar;

var styles = {
  expandLink: {
    position: 'absolute',
    backgroundColor: 'red',
    top: '-30px',
    height: '30px',
    right: '20px',
    padding: '0 20px',
    lineHeight: '30px'
  },
  sideBar: {
    position: 'fixed',
    right: '0px',
    top: '0px',
    height: '100%',
    width: '15%',
    backgroundColor: '#3B60A8',
    zIndex: '75000',
    color: 'white',
    padding: '30px',
    transition: 'height .5s',
    [mediaQueries.desktop]: {
      width: '100%',
      top: 'auto',
      bottom: '0px',
      height: '120px'
    },
    [mediaQueries.tablet]: {
      width: '100%',
      top: 'auto',
      bottom: '0px',
      height: '120px'
    }
  },
  expandedSidebar: {
    height: '90%',
    [mediaQueries.tablet]: {
      height: '90%'
    }
  },
  sideBarTitle: {
    fontWeight: '600',
    fontSize: '24pt',
    marginBottom: '30px',
    fontFamily: 'Josefin Slab',
    textTransform: 'uppercase',
    [mediaQueries.tablet]: {
      fontSize: '16pt'
    }
  },
  sideBarDescription: {
    fontSize: '12pt',
    marginBottom: '40px'
  },
  sideBarLinks: {
    color: '#FCBD46',
    textDecoration: 'none',
    display: 'block',
    fontSize: '10pt',
    padding: '10px 0',
    fontFamily: 'Fira Sans'
  },
  twitterIcon: {
    color: '#55acee'
  },
  tweets: {
    marginBottom: '40px',
    [mediaQueries.tablet]: {
      width: '29.3%',
      margin: '0 2%',
      'float': 'left'
    },
    [mediaQueries.mobile]: {
      display: 'none'
    }
  },
  twitterTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '700'
  },
  referencesTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '700',
    marginBottom: '20px'
  },
  sideBarTopic: {
    [mediaQueries.desktop]: {
      width: '33.3%',
      'float': 'left'
    },
    [mediaQueries.mobile]: {
      width: '100%',
      'float': 'none'
    }
  },
  sideBarReferences: {
    [mediaQueries.desktop]: {
      width: '33.3%',
      'float': 'left'
    },
    [mediaQueries.mobile]: {
      width: '100%',
      'float': 'none'
    }
  },
  expandButton: {

  }
};
