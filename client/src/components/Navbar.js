import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'boxicons';

function Navbar() {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <header class='header'>
        <p class='logo'>Logo</p>
        <ul class='navbar'>
          {user ? (
            <>
              <li>
                <Link to='/profile'>
                  <box-icon
                    type='solid'
                    name='user-account'
                    size='md'
                  ></box-icon>
                </Link>
              </li>
              {user && user.type === 'Admin' ? (
                <>
                  <li>
                    <Link to='/admin-dashboard'>
                      <box-icon
                        name='dashboard'
                        type='solid'
                        size='md'
                      ></box-icon>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/doctor-dashboard'>
                      <box-icon
                        name='dashboard'
                        type='solid'
                        size='md'
                      ></box-icon>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to='/logout'>
                  <box-icon name='log-out' size='md'></box-icon>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <box-icon name='log-in' size='md'></box-icon>
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
