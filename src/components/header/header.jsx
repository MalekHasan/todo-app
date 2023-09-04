import React from "react";
import "./header.scss";

import { Link } from "react-router-dom";
import Login from "../auth/login";

export default function Header() {
  return (
    <>
      <nav className="primaryColor">
        <div>
          <Link className="nav-link" to="/" href="#">
            Home
          </Link>
          <Link className="nav-link" to="/settings">
            Settings
          </Link>
        </div>
        <Login />
      </nav>
    </>
  );
}
