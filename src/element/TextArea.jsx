
import React, { PropTypes } from 'react';
import Base from './Base';

/**
 * Responsibilities:
 *
 */
export default class TextArea extends Base {
  constructor(props, context) {
    super(props, context);

    this.state = {
      focus: false,
      html: props.value,
    };
  }

  /**
   * Should we update the html?
   *
   * @param nextProps
   */
  componentWillReceiveProps({ value }) {
    if (value !== this.state.html) {
      // value has changed
      this.setState({
        html: value,
      });
    }
  }

  /**
   * Should the component update?
   *
   * @param nextProps
   * @param nextState
   */
  shouldComponentUpdate(nextProps, { html }) {
    return (this.state.html !== html);
  }

  /**
   * Focus
   *
   * @param event
   */
  onFocus = () => {
    this.setState({
      focus: true,
    });

    this.props.onFocus(this.props.name);
  };

  /**
   * Un-focus
   *
   * @param event
   */
  onBlur = () => {
    this.setState({
      focus: false,
    });

    this.props.onBlur(this.props.name);
  };

  /**
   * Manage changing the value
   *
   * @param event
   */
  onKeyUp = (event) => {
    // update the state but don't set it as we don't want to re-render
    this.state.html = event.target.innerText;
    this.fireOnChange(event.target.innerText);
  };

  /**
   * Render the Text
   *
   * @returns {XML}
   */
  render() {
    const { focus, value } = this.state;
    const { name, placeholder, tabIndex } = this.props;

    const className = [
      'react-forms-textarea',
    ];

    if (focus) {
      className.push('react-forms--focus');
    }

    return (
      <div className={className.join(' ')}>
        <pre
          contentEditable="true"
          type="text"
          id={name}
          name={name}
          onKeyUp={this.onKeyUp}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          tabIndex={tabIndex}
        >{value}</pre>
        <div className="react-forms-underline" />
        <div className="react-forms-underline-active" />
      </div>
    );
  }
}

TextArea.propTypes = Object.assign({
  /**
   * Element blurred
   */
  onBlur: PropTypes.func,

  /**
   * Element is in focus
   */
  onFocus: PropTypes.func,

}, Base.propTypes);

TextArea.defaultProps = Object.assign({
  /**
   * Called when the element blurs
   */
  onBlur: () => {},

  /**
   * Called when the element is in focus
   */
  onFocus: () => {},

}, Base.defaultProps);
