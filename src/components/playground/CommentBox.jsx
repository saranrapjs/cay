import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

import { sendComment } from '../../actions/playground';

import backdraft from 'backdraft-js';

import EmojiPicker from 'react-emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';

import MdFormatBold from 'react-icons/lib/md/format-bold';
import MdFormatItalic from 'react-icons/lib/md/format-italic';
import MdLink from 'react-icons/lib/md/link';
import MdFormatQuote from 'react-icons/lib/md/format-quote';
import FaSmileO from 'react-icons/lib/fa/smile-o';
import FaHeart from 'react-icons/lib/fa/heart';

@connect(state => state.playground)
@Radium
class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      showEmojiPicker: false
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  onToolBarClick(style) {
    const {editorState} = this.state;
    var newState = RichUtils.toggleInlineStyle(editorState, style);
    this.onChange(newState);
    console.log("Bold click");
    console.log(newState);
  }

  onSendClick() {

    var markup = {
      'BOLD': ['<strong>', '</strong>'],
      'ITALIC': ['<em>', '</em>']
    };
    
    var contentState = this.state.editorState.getCurrentContent();
    var htmlContent = backdraft(convertToRaw(contentState), markup).join("<br />");

    var preparedComment = {
      user: 0,
      content: htmlContent,
      likes: 0,
      liked: false,
      reactions: [],
      upvoted: false
    };
    this.props.dispatch(sendComment(preparedComment));
    
  }

  setEmoji() {

  }

  toggleEmojiPicker() {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={styles.emojiPickerStyles} onSelect={this.setEmoji}
          query={this.state.emoji}
        />
      )
    }
  }

  render() {

    const {editorState} = this.state;
    console.log('render');

    var toolBar = this.props.togglerGroups['content'].togglers['rich_content'].status 
      || this.props.togglerGroups['content'].togglers['emoji'].status
      ?
      <div style={ styles.toolBar }>
          {  
            this.props.togglerGroups['content'].togglers['rich_content'].status ? 
              <span>
                <button onClick={ this.onToolBarClick.bind(this, 'BOLD') } style={ styles.toolBarButton }><MdFormatBold /></button>
                <button onClick={ this.onToolBarClick.bind(this, 'ITALIC') } style={ styles.toolBarButton }><MdFormatItalic /></button>
                <button style={ styles.toolBarButton }><MdLink /></button>
                <button style={ styles.toolBarButton }><MdFormatQuote /></button>
              </span>
            : 
              ''
          }
          {  
            this.props.togglerGroups['content'].togglers['emoji'].status ? 
              <span>
                <button onClick={ this.toggleEmojiPicker.bind(this) } style={ styles.toolBarButton }><FaSmileO /></button>
              </span>
            : 
              ''
          }
        </div>
      : '';
    return (
      <div style={ styles.commentBox }>
        <h3 style={ styles.commentBoxTitle }><span style={ styles.postingAs }>Posting as </span><strong style={ styles.strong }>{ this.props.togglerGroups['privacy'].togglers['anonymity'].status ? 'coolcat' : 'Jane Doe' }</strong></h3>
        { toolBar }
        <div style={ styles.draftJsEditor }>
          { this.emojiPicker() }
          <Editor ref="draftJsEditor" editorState={editorState} onChange={this.onChange} />
        </div>
        <div style={ styles.commentBoxActions }>
          <button style={ styles.sendButton } onClick={ this.onSendClick.bind(this) }>Post</button>
        </div>
        <div style={ styles.safetyTips }>
          <span style={ styles.heart }><FaHeart /></span> Dont engage in personal attacks! Remember you can always use the report tools.
        </div>
      </div>
      );

  }
}

// same as the @connect decorator above
export default CommentBox;

var styles = {
  draftJsEditor: {
    padding: '20px',
    background: 'white',
    position: 'relative'
  },
  toolBar: {
    backgroundColor: '#eee',
    borderBottom: '1px solid #aaa'
  },
  commentBox: {
    backgroundColor: '#F77260',
    padding: '20px',
    borderRadius: '8px'
  },
  commentBoxActions: {
    padding: '20px',
    background: 'white',
    textAlign: 'right'
  },
  sendButton: {
    padding: '10px 15px',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    background: '#083',
    cursor: 'pointer'
  },
  commentBoxContent: {
    backgroundColor: 'white',
    padding: '20px',
    minHeight: '250px'
  },
  commentBoxTitle: {
    fontSize: '11pt',
    paddingBottom: '10px',
    fontFamily: 'Fira Sans'
  },
  toolBarButton: {
    cursor: 'pointer',
    padding: '10px',
    borderRight: '1px solid #aaa',
    borderTop: '0',
    borderLeft: '0',
    borderBottom: '0',
    background: 'none',
    fontSize: '12pt'
  },
  heart: {
    color: '#900'
  },
  safetyTips: {
    background: 'white',
    padding: '20px',
    color: '#999',
    borderTop: '1px solid #eee'
  },
  strong: {
    fontWeight: 'bold',
    fontFamily: 'Fira Sans'
  },
  postingAs: {
    fontFamily: 'Fira Sans'
  },
  emojiPickerStyles: {
    position: 'absolute',
    left: 0, 
    top: '0px',
    backgroundColor: 'white',
    width: '100%',
    padding: '20px',
    border: '1px solid #0074d9',
    borderTop: 'none',
    zIndex: '9999'
  }
};