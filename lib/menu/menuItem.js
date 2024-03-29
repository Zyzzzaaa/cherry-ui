import React, { useContext } from "react";
import classNames from 'classnames';
import { MenuContext } from ".";
var MenuItem = function MenuItem(props) {
  var index = props.index,
    disabled = props.disabled,
    children = props.children,
    className = props.className;
  var context = useContext(MenuContext);
  var classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index == index
  });
  var handleClick = function handleClick() {
    if (context.onSelect && !disabled && typeof index == 'string') {
      context.onSelect(index);
    }
  };
  return /*#__PURE__*/React.createElement("li", {
    className: classes,
    onClick: handleClick
  }, children);
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;