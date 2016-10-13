
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Base from './Base';

/**
 * Select menu
 *
 */
export default class Select extends Base {
  /**
   * Internal state
   *
   */
  state = {
    focus: false,
  };

  /**
   * Focus
   *
   * @param event
   */
  onFocus = () => {
    this.setState({
      focus: true,
    });
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
  };

  /**
   * Render the Select
   *
   * @returns {XML}
   */
  render() {
    const className = [
      'react-forms-select',
    ];

    if (this.state.focus) {
      className.push('react-forms--focus');
    }

    if (this.props.fitToContent) {
      className.push('react-forms-select--fit');
    }

    return (
      <div className={className.join(' ')}>
        <div className="react-forms-select-container">
          <select
            id={this.props.name}
            name={this.props.name}
            value={this.props.value}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            tabIndex={this.props.tabIndex}
          >
            {this.props.allowEmpty ? <option key="__empty-val" value=""></option> : null}
            {this.props.options.map((label, value) => <option key={value} value={value}>{label}</option>)}
          </select>
          <i className="material-icons">arrow_drop_down</i>
        </div>
        <div className="react-forms-underline" />
        <div className="react-forms-underline-active" />
      </div>
    );
  }
}

Select.propTypes = {

  /**
   * Add an empty value in the first option
   */
  allowEmpty: PropTypes.bool,

  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,

  /**
   * Make the input width the same as the content
   */
  fitToContent: PropTypes.bool,

  /**
   * Options for the select list
   */
  options: ImmutablePropTypes.orderedMap.isRequired,
};
