
import React, { PropTypes } from 'react';
import Base from './Base';

/**
 * Responsibilities:
 *
 */
export default class Text extends Base {
  /**
   * Internal state
   *
   */
  state = {
    focus: false,
  };

  /**
   * Input element use for getting the input width
   *
   * @type {{}}
   */
  inputWidthElement = undefined;

  /**
   * Make sure we remove the element if one was created
   */
  componentWillUnmount = () => {
    if (this.inputWidthElement) {
      document.removeChild(this.inputWidthElement);
    }
  };

  /**
   * Get the input elements width
   *
   * @returns {Number}
   */
  getInputElementWith = () => {
    if (!this.inputWidthElement) {
      const input = document.createElement('div');
      input.className = 'react-forms-text-input';
      input.style.display = 'inline-block';
      input.style.width = 'auto';
      input.style.position = 'fixed';
      input.style.bottom = 0;
      input.style.zIndex = -1;
      input.style.whiteSpace = 'pre';
      input.style.visibility = 'hidden';

      this.inputWidthElement = document.createElement('div');
      this.inputWidthElement.appendChild(input);

      document.body.appendChild(this.inputWidthElement);
    }

    if (!this.props.value) {
      return '1.5rem';
    }

    // set the class on the container
    this.inputWidthElement.className = (this.state.focus ? 'react-forms--focus' : '');

    const input = this.inputWidthElement.childNodes[0];
    input.innerText = this.props.value;
    return input.getBoundingClientRect().width;
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
   * Render the Text
   *
   * @returns {XML}
   */
  render() {
    const className = [
      'react-forms-text',
    ];

    if (this.state.focus) {
      className.push('react-forms--focus');
    }

    if (this.props.fitToContent) {
      className.push('react-forms-text--fit');
    }

    let style = {};
    if (this.props.fitToContent) {
      style = {
        maxWidth: this.getInputElementWith(),
      };
    }

    return (
      <div className={className.join(' ')} style={style}>
        <input
          type="text"
          id={this.props.name}
          name={this.props.name}
          value={this.props.value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onWheel={this.props.onWheel}
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
        />
        <div className="react-forms-underline" />
        <div className="react-forms-underline-active" />
      </div>
    );
  }
}

Text.propTypes = {
  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,

  /**
   * Make the input width the same as the content
   */
  fitToContent: PropTypes.bool,

  /**
   * Element blurred
   */
  onBlur: PropTypes.func,

  /**
   * Element is in focus
   */
  onFocus: PropTypes.func,

  /**
   * On wheel
   */
  onWheel: PropTypes.func,
};

Text.defaultProps = {
  /**
   * Called when the element blurs
   */
  onBlur: () => {},

  /**
   * Called when the element is in focus
   */
  onFocus: () => {},
};
