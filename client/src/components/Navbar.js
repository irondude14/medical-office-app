import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <nav>
        <ul>
          {user ? (
            <>
              <button>
                <Link to='/profile'>Profile</Link>
              </button>
              <button>
                <Link to='/logout'>Logout</Link>
              </button>
            </>
          ) : (
            <>
              <button>
                <Link to='/login'>Login</Link>
              </button>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
