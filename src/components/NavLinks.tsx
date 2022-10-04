import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import links from "../utils/links";

interface INavLinksProps {
  toggleSidebar?: () => void;
}

const NavLinks = ({ toggleSidebar }: INavLinksProps): ReactElement => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
