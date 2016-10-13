
import React, { PropTypes } from 'react';

const Control = (props) => {
  const child = (props.children.constructor === Array ? props.children[0] : props.children);

  const className = ['react-forms-control'];

  if (child.props.isRequired) {
    className.push('required');
  }

  if (props.isEmpty) {
    className.push('react-forms-control--empty');
  }

  if (props.compact) {
    className.push('react-forms-control--compact');
  }

  return (
    <li className={className.join(' ')}>
      <label htmlFor={child.props.name}>
        {props.label}
      </label>
      {props.children}
    </li>
  );
}

Control.propTypes = {
  /**
   * Compact form
   */
  compact: PropTypes.bool,

  /**
   * Group label
   */
  label: PropTypes.string.isRequired,

  /**
   * Tooltip for the input
   */
  tooltip: PropTypes.string,

  /**
   * Is the child element empty?
   */
  isEmpty: PropTypes.bool,

  /**
   * Children should be a single child form element
   */
  children: PropTypes.element,
};

export default Control;
