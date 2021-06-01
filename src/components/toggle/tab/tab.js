import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TabContent from './TabContent';
import TabButton from './TabButton';


import './tab.scss';

/**
 * Returns an object containing the cloned element plus some props useful to create tab buttons.
 */
const filterTabChildren = (child, index, props) => {
  checkOnAllowedChildren(child, [TabContent], 'Tab');

  const result = Object.create(null);

  result.child = React.cloneElement(child, { active: props.active === index });
  result.title = child.props.title;
  result.icon = child.props.icon;
  result.disabled = child.props.disabled;

  return result;
};


/**
 * The Tab component consists of clickable labels that shows the corresponding content.
 */
// the React.memo has been used here rather than on the export line like other cases, to avoid wrapping the shortcut.
const Tab = React.memo((props) => {
  const { children, active, onChange, color, orientation, className, ...rest } = props;
  const tabContents = Children.toArray(children).map((child, index) => filterTabChildren(child, index, props));
  const classList = classNames(`bi bi-tab tab-color-${color}`, {
    'tab-orientation': orientation === 'vertical',
  }, className);

  return (
    <div className={classList} {...rest}>
      <nav className="bi-tab-nav">
        <ul>
          {tabContents.map(({ title, icon, disabled }, index) => (
            <TabButton
              key={title}
              title={title}
              icon={icon}
              active={active}
              index={index}
              onChange={onChange}
              disabled={disabled}
            />
          ))}
        </ul>
      </nav>
      <section className="bi-tab-contents">
        {tabContents.map(({ child }) => child)}
      </section>
    </div>
  );
});

Tab.propTypes = {
  /**
   * Defines the color of the link into the label tab, can be one of the following:
   * `default`, `primary`, `secondary`, `info`, `warning`, `success`, `danger`.
   */
  color: Color,
  /**
   * The callback to be performed on content change
   */
  onChange: PropTypes.func,
  /**
   * Defines the current active tab index
   */
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  /**
   /**
   * This props defines the orientation of the tabs.
   */
  orientation: PropTypes.string,
  /**
   * @ignore
   */
  children: PropTypes.node,
};

Tab.defaultProps = {
  onChange: undefined,
  color: 'default',
  orientation: 'horizontal',
  children: undefined,
};

// shortcut
Tab.Content = TabContent;

export default Tab;