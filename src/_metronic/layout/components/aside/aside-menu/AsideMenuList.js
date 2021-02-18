/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useSelector } from "react-redux";
import { ROLES } from "../../../../../Constants";
import Hoc from "../../../../../app/modules/Common/components/Hoc";
import DvrIcon from "@material-ui/icons/Dvr";
import Icon from "@material-ui/core/Icon";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import StoreIcon from '@material-ui/icons/Store';

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const authReducer = useSelector(({ auth }) => auth);

  const isShowMenu = (roles) => {
    roles = roles === undefined ? [] : roles;
    if (roles.length > 0) {
      // check if route is restricted by role
      let intersection = roles.filter((x) => authReducer.roles.includes(x));
      return intersection.length > 0;
    } else {
      return true;
    }
  };

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <Hoc>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* begin::section */}
        <li className="menu-section ">
            <h4 className="menu-text">Manage shop</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
        {/*begin::1 Product*/}
        <li
            className={`menu-item ${getMenuItemActive("/product/", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/product/">
            <span className="svg-icon menu-icon">
              <FastfoodIcon></FastfoodIcon>
              </span>
              <span className="menu-text">Products</span>
            </NavLink>
          </li>
        {/*End::1 Product List*/}
        
        {/*begin::2 ProductGroup*/}
        <li
            className={`menu-item ${getMenuItemActive("/productGroup", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/productGroup">
              <span className="svg-icon menu-icon">
                <GroupWorkIcon></GroupWorkIcon>
              </span>
              <span className="menu-text">Product Groups</span>
            </NavLink>
          </li>
        {/*End::2 ProductGroup*/}

        {/*begin::3 Edit Stock*/}
        <li
            className={`menu-item ${getMenuItemActive("/stock", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/stock">
              <span className="svg-icon menu-icon">
                <StoreIcon></StoreIcon>
              </span>
              <span className="menu-text">Edit Stock</span>
            </NavLink>
          </li>
          {/*End::3 Stock*/}
          {/* end:: section */}
        {/* begin::section */}
        {/* <li className="menu-section ">
            <h4 className="menu-text">Employee</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li> */}

          {/* end:: section */}

          {/*begin::1 newEmployee*/}
          {/* <li
            className={`menu-item ${getMenuItemActive("/employee/new", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/employee/new">
              <span className="svg-icon menu-icon">
                <Icon>star</Icon>
              </span>
              <span className="menu-text">New Employee</span>
            </NavLink>
          </li> */}
          {/*End::1 newEmployee*/}

          {/*begin::1 Employee List*/}
          {/* <li
            className={`menu-item ${getMenuItemActive("/employee/", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/employee/">
              <span className="svg-icon menu-icon">
                <Icon>supervisor_account</Icon>
              </span>
              <span className="menu-text">Employee</span>
            </NavLink>
          </li> */}
          {/*End::1 Employee List*/}
      </ul>
      {/* end::Menu Nav */}
    </Hoc>
  );
}
