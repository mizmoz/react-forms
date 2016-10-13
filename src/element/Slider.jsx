
import React, { PropTypes } from 'react';
import Base from './Base';

/**
 * Slider using the rc-slider component
 */
export default class Slider extends Base {
  /**
   * Render the Text
   *
   * @returns {XML}
   */
  render() {
    return (
      <div className="react-forms-text">
        <input
          type="text"
          id={this.props.name}
          name={this.props.name}
          value={this.props.value}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
        />
      </div>
    );
  }
}

Text.propTypes = {
  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,
};
