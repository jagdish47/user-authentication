import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
            {isUserSignedIn ? (
              <>
                <NavLink to="/account">Account</NavLink>
                <li>
                  <button onClick={handleSignOut}>Sign out</button>
                </li>
              </>
            ) : (
              <>
                {" "}
                <NavLink to="/login">
                  <li>Login</li>
                </NavLink>
                <NavLink to="register">
                  <li>Register</li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
