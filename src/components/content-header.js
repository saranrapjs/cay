import React from 'react';
import Radium from 'radium';

import Heading from './heading';

class ContentHeader extends React.Component {
  render() {
    return (
      <section style={styles.base}>
        <Heading size="large" subhead="some optional subhead">{this.props.title}</Heading>
      </section>
    );
  }
}

var styles = {
  base: {
    position: 'relative',
    padding: '15px 15px 0 15px'
  }
}

export default ContentHeader;
