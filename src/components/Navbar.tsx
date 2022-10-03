import React, { useState, ReactElement } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { toggleSidebar, logoutUser } from "../features/user/userSlice";

const Navbar = (): ReactElement => {
  const [showLogout, setShowLogout] = useState(false);

  const { user } = useSelector((store: RootState) => store.user);

  const dispatch = useDispatch<AppDispatch>();

  const toggle = (): void => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              className="dropdown-btn"
              type="button"
              onClick={() => dispatch(logoutUser())}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
