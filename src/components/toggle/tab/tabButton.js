import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeIconFromProp, IconProp } from '../../../shared';


/**
 * Tab button is a component used to show the tab's label.
 * A label could have a title or title plus icon or icon only.
 * If neither title nor icon are defined the component will show 'no title' as a label.
 */
const TabButton = (props) => {
  const { title, icon, active, index, onChange, disabled } = props;

  // local handler
  const clickOrKeyDownHandler = () => {
    if (!disabled) {
      onChange(index);
    }
  };

  return (
    <li className={classNames({ 'tab-btn-current': active === index, 'tab-disabled': disabled })}>
      {/* The following eslint rule has been disabled so that we can use <a> as button tag. */}
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <a onClick={clickOrKeyDownHandler} onKeyDown={clickOrKeyDownHandler} role="button" tabIndex={0}>
        {!!title && (
          <>
            {!!icon && makeIconFromProp(icon)}
            <span className="tab-title">
              {title}
            </span>
          </>
        )}
        {!title && (
          <>
            {(!!icon && makeIconFromProp(icon)) || <span>no  title</span>}
          </>
        )}
      </a>
      {/* eslint-enable jsx-a11y/anchor-is-valid */}
    </li>
  );
};

TabButton.propTypes = {
  /**
   * Index is the internal index to identify which is the active label
   */
  index: PropTypes.number,
  /**
   * Disable is used to define which label should be disabled.
   */
  disabled: PropTypes.bool,
  /**
  * The callback to be performed on content change
  */
  onChange: PropTypes.func.isRequired,
  /**
  * Defines the current active tab index
  */
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  /**
   * Title is the string that will be used as tab label
   */
  title: PropTypes.string,
  /**
   * Define tab icon
  */
  icon: IconProp,
};

TabButton.defaultProps = {
  index: 0,
  disabled: false,
  title: null,
  icon: undefined,
};

export default React.memo(TabButton);
