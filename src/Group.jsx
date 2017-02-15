
import React, { PropTypes } from 'react';

/**
 * Render a field set for the passed form elements
 *
 * @param children
 * @param id
 * @param title
 * @returns {XML}
 * @constructor
 */
const Group = ({ children, id, title }) => {
  const className = ['react-forms-group'];

  return (
    <fieldset id={id} className={className.join(' ')}>
      {title ? <h3>{title}</h3> : null}
      <ul>
        {children}
      </ul>
    </fieldset>
  );
};

Group.propTypes = {
  /**
   * Id for the li
   */
  id: PropTypes.string,

  /**
   * Group form inputs
   */
  children: PropTypes.node,

  /**
   * Group title
   */
  title: PropTypes.string,
};

export default Group;
