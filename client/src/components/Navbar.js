import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  MdDashboard,
  MdAccountCircle,
  MdLogin,
  MdLogout,
} from 'react-icons/md';
import { FaHospital } from 'react-icons/fa';

function Navbar() {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <header className='header'>
        <p className='logo'>
          <FaHospital style={{ fontSize: '32px', color: 'black' }} />
        </p>
        <ul className='navbar'>
          {user ? (
            <>
              <li>
                <Link to='/profile' data-label='Profile'>
                  <MdAccountCircle
                    style={{ fontSize: '36px', color: 'black' }}
                  />
                </Link>
              </li>
              {user && user.type === 'Admin' ? (
                <>
                  <li>
                    <Link to='/admin-dashboard' data-label='Dashboard'>
                      <MdDashboard
                        style={{ fontSize: '36px', color: 'black' }}
                      />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/doctor-dashboard' data-label='Dashboard'>
                      <MdDashboard
                        style={{ fontSize: '36px', color: 'black' }}
                      />
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to='/logout' data-label='Logout'>
                  <MdLogout style={{ fontSize: '36px', color: 'black' }} />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' data-label='Login'>
                  <MdLogin style={{ fontSize: '36px', color: 'black' }} />
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
