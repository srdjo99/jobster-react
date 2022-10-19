import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { RootState } from "../store";
import Wrapper from "../assets/wrappers/BigSidebar";

import { useAppSelector } from "../hooks/useRTK";

const BigSidebar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
