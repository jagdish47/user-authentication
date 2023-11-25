import React from "react";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-orange-500 p-3 text-white font-bold font-mono">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <NavLink to="/">
            <h1 className="text-2xl">HOME</h1>
          </NavLink>
        </div>
        <div>
          <ul className="flex gap-4">
            <NavLink to="/login">
              <li>Login</li>
            </NavLink>
            <NavLink to="register">
              <li>Register</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
