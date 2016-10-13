
import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

// use to create a unique id for the form
let __uniqueId = 0;

/**
 * Responsibilities:
 *
 */
export default class Form extends Component {
  /**
   * Init the form state
   *
   * @type {{}}
   */
  state = {
    values: this.props.values,
  };

  /**
   * Handle form value changes
   *
   * @param name
   * @param value
   */
  onChange = (name, value) => {
    this.setState({
      values: this.state.values.set(name, value),
    });

    this.props.onChange(name, value);
  };

  /**
   * Submit the form
   *
   * @param event
   */
  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /**
   * Render the form title if there is one.
   * @returns {*}
   */
  renderTitle() {
    if (!this.props.title) {
      return null;
    }

    return (
      <h1>{this.props.title}</h1>
    );
  }

  /**
   * Render the form
   *
   * @returns {XML}
   */
  render() {
    const className = this.props.className.slice(0);
    className.unshift('react-forms');

    if (this.props.compact) {
      className.push('react-forms--compact');
    }

    return (
      <form
        name={this.props.name}
        className={className.join(' ')}
        onSubmit={this.onSubmit}
      >
        {this.renderTitle()}
        {this.props.children({
          onChange: this.onChange,
          values: this.state.values,
        })}
      </form>
    );
  }
}

Form.propTypes = {
  /**
   * Classes to pass to the form element
   */
  className: PropTypes.arrayOf(PropTypes.string),

  /**
   * Name of the form
   */
  name: PropTypes.string.isRequired,

  /**
   * Form field values
   */
  values: ImmutablePropTypes.map.isRequired,

  /**
   * Fired when something in the form changes
   */
  onChange: PropTypes.func.isRequired,

  /**
   *
   */
  children: PropTypes.func.isRequired,

  /**
   * Compact form
   */
  compact: PropTypes.bool,

  /**
   * Form title
   */
  title: PropTypes.string,
};

Form.defaultProps = {
  className: [],
};
