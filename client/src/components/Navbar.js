import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'boxicons';

function Navbar() {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <header className='header'>
        <p className='logo'>Logo</p>
        <ul className='navbar'>
          {user ? (
            <>
              <li>
                <Link to='/profile' data-label='Profile'>
                  <box-icon name='user' size='md'></box-icon>
                </Link>
              </li>
              {user && user.type === 'Admin' ? (
                <>
                  <li>
                    <Link to='/admin-dashboard' data-label='Dashboard'>
                      <box-icon
                        name='bar-chart-square'
                        type='solid'
                        size='md'
                      ></box-icon>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/doctor-dashboard' data-label='Dashboard'>
                      <box-icon
                        name='bar-chart-square'
                        type='solid'
                        size='md'
                      ></box-icon>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to='/logout' data-label='Logout'>
                  <box-icon name='log-out' size='md'></box-icon>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' data-label='Login'>
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
