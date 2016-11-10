
import React, { PropTypes } from 'react';
import Base from './Base';

/**
 * Toggle switch form element
 */
export default class Switch extends Base {
  /**
   * Toggle the switch
   *
   * @param event
   */
  onClick = (event) => {
    event.preventDefault();
    this.fireOnChange(!Base.getBooleanValue(this.props.value));
  };

  /**
   * Render the switch
   *
   * @returns {XML}
   */
  render() {
    const { value } = this.props;
    const isChecked = Base.getBooleanValue(value);
    const className = ['react-forms-switch'];

    if (isChecked) {
      className.push('react-forms-switch--checked');
    }

    return (
      <div
        className={className.join(' ')}
        aria-checked={isChecked.toString()}
        role="switch"
        onClick={this.onClick}
      >
        <div className="react-forms-switch-container" />
        <div className="react-forms-switch-handle" />
      </div>
    );
  }
}

Switch.propTypes = Object.assign({}, Base.propTypes, {
  /**
   * Element blurred
   */
  onBlur: PropTypes.func,

  /**
   * Element is in focus
   */
  onFocus: PropTypes.func,
});

Switch.defaultProps = Object.assign({}, Base.defaultProps, {
  /**
   * Called when the element blurs
   */
  onBlur: () => {},

  /**
   * Called when the element is in focus
   */
  onFocus: () => {},
});
