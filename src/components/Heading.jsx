import React from 'react';
import Radium from 'radium';

@Radium
class Heading extends React.Component {
  render() {
    return (
      <div>
        <h1 style={[
          styles.base,
          this.props.size === 'xsmall' && styles.xsmall,
          this.props.size === 'small' && styles.small,
          this.props.size === 'medium' && styles.medium,
          this.props.size === 'large' && styles.large,
          this.props.size === 'xlarge' && styles.xlarge,
          this.props.style
        ]}>
          <span style={ { fontWeight: this.props.fontWeight } }>{this.props.children}</span>
        </h1>
        <h2 style={ styles.subhead }>
          <span>{this.props.subhead}</span>
        </h2>
      </div>
    );
  }
}

const styles = {
  subhead: {
    fontSize: '12pt',
    display: 'inline-block',
    paddingLeft: '4px',
    fontWeight: 600,
    color: '#777',
    lineHeight: 1
  },
  base: {
    fontWeight: 600,
    marginBottom: '.5em'
  },
  xsmall: {
    fontSize: 14,
  },
  small: {
    fontSize: 18
  },
  medium: {
    fontSize: 24
  },
  large: {
    fontSize: 30
  },
  xlarge: {
    fontSize: 36
  }
}

export default Heading;
