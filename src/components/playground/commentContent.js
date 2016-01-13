import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

@connect(state => state.playground)
@Radium
class CommentContent extends React.Component {

  render() {

    return (
      <div style={ styles.commentContent }>
        Lorem ipsum dolor sit amet.
      </div>
    );

  }
}

// same as the @connect decorator above
export default CommentContent;

var styles = {
  commentContent: {
    fontSize: '12pt',
    minHeight: '60px'
  }
};