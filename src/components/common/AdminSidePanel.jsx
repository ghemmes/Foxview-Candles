import { ADMIN_PRODUCTS } from '@/constants/routes';
import { ADMIN_USERS } from '@/constants/routes';
import { ADMIN_DASHBOARD } from '@/constants/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_PRODUCTS}
        >
          Candles
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0"></h4>
        {/* <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_USERS}
        >
          Users
        </NavLink> */}
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_DASHBOARD}
        >
          Dashboard
        </NavLink>

      </div>
    </div>
  </aside>
);

export default SideNavigation;
