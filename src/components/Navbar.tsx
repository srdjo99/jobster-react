import React, { useState, ReactElement } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";

const Navbar = (): ReactElement => {
  const { user } = useSelector((store: RootState) => store.user);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => console.log("toggle sidebar")}
        >
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
            onClick={() => console.log("toggle logout dropdown")}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button
              className="dropdown-btn"
              type="button"
              onClick={() => console.log("logout user")}
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
