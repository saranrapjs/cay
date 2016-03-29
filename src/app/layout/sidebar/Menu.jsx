import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';

import MenuItem from 'app/layout/sidebar/MenuItem';

import MdBuild from 'react-icons/lib/md/build';
import MdSettings from 'react-icons/lib/md/settings';
import MdInfoOutline from 'react-icons/lib/md/info-outline';
import MdGroup from 'react-icons/lib/md/group';

import { Lang } from 'i18n/lang';
import settings from 'settings';

@Lang
@Radium
class Menu extends React.Component {

  render() {
    return (
      <div>
        <Link to="/" style={styles.logo}>The Coral Project</Link>
        <div style={ styles.productName }>TRUST</div>
        <ul style={ styles.sideBarMenu }>
          {/*<MenuItem name="Dashboard" target="/" icon={<MdInsertChart />} />*/}
          {/*<MenuItem name="Explore" target="/explore" icon={<MdTimeline />} />*/}
          <MenuItem name={ window.L.t('User groups') } target="/groups" icon={<MdGroup />} />
          <MenuItem name={ window.L.t('Group Creator') } target="/group-creator" icon={<MdBuild />} />
          <MenuItem name={ window.L.t('Tag Manager') } target="/tag-manager" icon={<MdSettings />}/>
          <MenuItem name={ window.L.t('About') } target="/about" icon={<MdInfoOutline />}/>
          {/*<MenuItem name="Settings" target="/settings" icon={<MdSettings />} />*/}
        </ul>
      </div>
    );
  }
}

var styles = {
  logo: {
    backgroundImage: 'url(/img/logo_white.png)',
    backgroundSize: '40px 40px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '20px 14px',
    backgroundColor: '#4B4B4B',
    color: 'white',
    fontSize: '10pt',
    padding: '0 20px 0 70px',
    textDecoration: 'none',
    display: 'block',
    height: '75px',
    lineHeight: '73px',
    fontWeight: 'bold'
  },
  sideBarMenu: {
  },
  productName: {
    background: '#F47F68',
    textTransform: 'uppercase',
    color: 'white',
    padding: '20px',
    fontWeight: 'bold'
  }
};

export default Menu;
