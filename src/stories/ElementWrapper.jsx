
import React, { Component, PropTypes } from 'react';

const elementWrapper = (WrapComponent) => {
  class ElementWrapper extends Component {
    /**
     * Update the state
     *
     * @param name
     * @param value
     */
    onChange = (name, value = undefined) => {
      const key = (value !== undefined ? name : this.props.stateKey);
      const newValue = (value !== undefined ? value : name);

      this.setState({
        [key]: newValue,
      });

      this.props.onChange(key, newValue);
    };

    /**
     * Render the component with the state wrapper
     *
     * @returns {XML}
     */
    render() {
      return (
        <div style={{ margin: '1.5rem auto', width: this.props.width }}>
          <WrapComponent
            {...this.props}
            {...this.state}
            onChange={this.onChange}
          />
        </div>
      );
    }
  }

  ElementWrapper.propTypes = {
    /**
     * Element wrapper width
     */
    width: PropTypes.string,

    /**
     * On change callback
     */
    onChange: PropTypes.func,

    /**
     * Name of the key to save the passed state in. This is only used if the onChange
     * callback is passed a single argument rather than fn(name, value)
     */
    stateKey: PropTypes.string,
  };

  ElementWrapper.defaultProps = {
    /**
     * By default log the updates to the console
     */
    onChange: console.log,

    /**
     * Default width of the element
     */
    width: '14rem',

    /**
     * By default use value as the key name
     */
    stateKey: 'value',
  };

  return ElementWrapper;
};

export default elementWrapper;
