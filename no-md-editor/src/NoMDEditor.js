// NoMDEditor.js
// Description:
// An markdown Editor based on slate. Programed by NOOXY.
// Copyright 2018 NOOXY. All Rights Reserved.

import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './NoMDEditor.css';
import initialValue from './initvalue.json'

class NoMDEditorButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let text=null;
    if(this.props.text) {
      text = <span>{this.props.text}</span>
    }
    return (
      <div className={this.props.active?'NoMDEditorButton NoMDEditorButton-active':'NoMDEditorButton'} onClick={this.props.onClick}>
        <span className="material-icons">
          {this.props.icon}
        </span>
        {text}
      </div>
    );
  }
}

class NoMDEditorEditor extends Component {
  render() {
    return (
      <div className="NoMDEditorEditor">
      </div>
    );
  }
}

class NoMDEditorToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NoMDEditorToolbar">
        {this.props.buttons.map(([type, icon, text, active, onclick])=>{
          return <NoMDEditorButton key={type} icon={icon} text={text} active={active} onClick={onclick}/>
        })}
      </div>
    );
  }
}

class NoMDEditor extends Component {

  state = {
    value: Value.fromJSON(initialValue)
  }

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  }

  hasBlock = type => {
   const { value } = this.state
   return value.blocks.some(node => node.type == type)
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  onClickBlock = (event, type) => {
    
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  renderMarkButton = (type, icon, text) => {
    const isActive = this.hasMark(type);
    return [type, icon, text, isActive, event => this.onClickMark(event, type)];
  }

  renderBlockButton = (type, icon, text) => {
    const isActive = this.hasBlock(type);
    return [type, icon, text, isActive, event => this.onClickBlock(event, type)];
  }

  renderNode = props => {
    const { attributes } = props;

    switch (props.node.type) {
      case 'paragraph':
        return <p {...attributes}>{props.children}</p>;
      case 'block-quote':
        return <blockquote {...attributes}>{props.children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{props.children}</ul>;
      case 'ordered-list':
        return <ol {...attributes}>{props.children}</ol>;
      case 'todo-list':
        return <ul {...attributes}>{props.children}</ul>;
      case 'table':
        return <table {...attributes}>{props.children}</table>;
      case 'table-row':
        return <tr {...attributes}>{props.children}</tr>;
      case 'table-head':
        return <th {...attributes}>{props.children}</th>;
      case 'table-cell':
        return <td {...attributes}>{props.children}</td>;
      case 'list-item':
        return <li {...attributes}>{props.children}</li>;
      case 'horizontal-rule':
        return <hr />;
      case 'code':
        return <code {...attributes}>{props.children}</code>;
      case 'image':
        return <img src={props.src} title={props.title} />;
      case 'link':
        return <a href={props.href}>{props.children}</a>;
      case 'heading1':
        return <h1 {...attributes}>{props.children}</h1>;
      case 'heading2':
        return <h2 {...attributes}>{props.children}</h2>;
      case 'heading3':
        return <h3 {...attributes}>{props.children}</h3>;
      case 'heading4':
        return <h4 {...attributes}>{props.children}</h4>;
      case 'heading5':
        return <h5 {...attributes}>{props.children}</h5>;
      case 'heading6':
        return <h6 {...attributes}>{props.children}</h6>;
      default:
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
        case 'bold':
          return <strong>{props.children}</strong>;
        case 'code':
          return <code>{props.children}</code>;
        case 'italic':
          return <em>{props.children}</em>;
        case 'underlined':
          return <u>{props.children}</u>;
        case 'deleted':
          return <del>{props.children}</del>;
        case 'added':
          return <mark>{props.children}</mark>;
        default:
      }
  }

  render() {
    return (
      <div className="NoMDEditor">
        <NoMDEditorToolbar buttons={[
          ['save', 'save', 'save', 0, null],
          this.renderMarkButton('bold', 'format_bold', ''),
          this.renderMarkButton('italic', 'format_italic', ''),
          this.renderMarkButton('underlined', 'format_underlined', ''),
          this.renderMarkButton('code', 'code', 'code'),
          this.renderMarkButton('code_block', 'code', 'code block'),
          ['more', 'more_horiz', 'more', 0, null]
        ]}/>
        <div className="NoMDEditorEditor">
        <Editor
          spellCheck
          autoFocus
          placeholder="Enter some text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
        </div>
      </div>
    );
  }
}

export default NoMDEditor;
