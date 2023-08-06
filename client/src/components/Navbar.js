import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <button>
            <Link to='/profile'>Profile</Link>
          </button>
          <button>
            <Link to='/login'>Login</Link>
          </button>
          <button>
            <Link to='/logout'>Logout</Link>
          </button>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
