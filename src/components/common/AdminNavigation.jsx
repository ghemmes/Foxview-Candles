import { ADMIN_DASHBOARD } from '@/constants/routes';
import logo from '@/images/logo-full.png';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import UserAvatar from '@/views/account/components/UserAvatar';
import { ADMIN_PRODUCTS } from '@/constants/routes';
import { ADMIN_USERS } from '@/constants/routes';

const AdminNavigation = () => {
  const { isAuthenticating, profile } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile
  }));

  return (
    <nav className="navigation navigation-admin">
      <div className="logo">
        <Link to={ADMIN_DASHBOARD} style={{ display: 'flex', alignItems: 'center' }}>
          <img alt="Logo" src={logo} />
          <h3>&nbsp; ADMIN PANEL</h3>
        </Link>
      </div>
      {/* <div className="navigation-divider">

        
      </div> */}
      
      <ul className="navigation-menu">
        <NavLink
          activeClassName="navigation-menu-active"
          className="navigation-menu"
          to={ADMIN_PRODUCTS}
        >
         &nbsp; Candles
        </NavLink>
        {/* <NavLink
          activeClassName="navigation-menu-active"
          className="navigation-menu"
          to={ADMIN_USERS}
        >
         &nbsp; Users
        </NavLink> */}
        <li className="navigation-menu-item">
          <UserAvatar
            isAuthenticating={isAuthenticating}
            profile={profile}
          />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
