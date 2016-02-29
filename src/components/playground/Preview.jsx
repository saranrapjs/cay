import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import CommentBox from './commentBox';
import Stream from './stream';

import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';

@connect(state => state.playground)
@Radium
class Preview extends React.Component {

  render() {

    return (
      <div style={ styles.preview }>
        <div style={ styles.previewBar }>
          <h2 style={ styles.previewBarTitle }>
            <MdRemoveRedEye />
            <span style={ styles.previewTitleSpan }>Preview</span>
          </h2>
        </div>
        <div style={ styles.sandBox }>
          <p style={ styles.sandBoxIntro }>This is a sandbox only, this preview will be reset every time you reload the page.</p>
          <CommentBox />
          <Stream />
        </div>
      </div>
    );
  }
}

// same as the @connect decorator above
export default Preview;

var styles = {
  preview: {
    background: 'white',
    padding: '40px',
    color: '#3d3d3d'
  },
  sandBox: {
  },
  sandBoxIntro: {
    padding: '20px',
    color: '#999',
    textAlign: 'center',
    fontSize: '9pt'
  },
  previewBar: {
    borderBottom: '1px solid #ccc',
    position: 'relative',
    fontSize: '16pt'
  },
  previewTitleSpan: {
    fontFamily: 'Fira Sans',
    fontWeight: '300',
    fontSize: '24pt'
  }
};