import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FloatingContent from '../FloatingContent';
import DropDownButton from './DropDownButton';
import DropDownLink from './DropDownLink';
import DropDownDivider from './DropDownDivider';
import { Placement } from '../../../shared';

import './dropdown.scss';

/**
 * `DropDown` is a controlled component that facilitates the creation of floating menus in proximity a given trigger.
 *
 * Unlike the FloatingContent or the Popover components, it is strictly designed for buttons, links or dividers.
 */
// the React.memo has been used here rather than on the export line like other cases, to avoid wrapping the shortcut.
const DropDown = React.memo((props) => {
  const { trigger, placement, isShown, onToggle, pointingArrow, children, className, ...rest } = props;
  const classList = classNames('bi', 'bi-dropdown', {
    'bi-dd-arrow': pointingArrow,
  }, className);

  return (
    <FloatingContent trigger={trigger} placement={placement} isShown={isShown} onToggle={onToggle}>
      <div className={classList} {...rest}>
        <ul>
          {children}
        </ul>
      </div>
    </FloatingContent>
  );
});


DropDown.propTypes = {
  /**
   * Defines the React node to apply the dropdown to
   */
  trigger: PropTypes.node.isRequired,
  /**
   * Defines whether the dropdown is shown or not
   */
  isShown: PropTypes.bool,
  /**
   * Defines the callback to be performed when clicking on the given toggle,
   */
  onToggle: PropTypes.func.isRequired,
  /**
   * Defines the dropdown placement
   */
  placement: Placement,
  /**
   * Defines whether or not the dropdown should show a pointing arrow
   */
  pointingArrow: PropTypes.bool,
};


DropDown.defaultProps = {
  isShown: false,
  placement: 'bottom-center',
  pointingArrow: true,
};

// shortcuts
DropDown.Button = DropDownButton;
DropDown.Link = DropDownLink;
DropDown.Divider = DropDownDivider;

export default DropDown;