import React, { ReactElement } from "react";
import { FaHome } from "react-icons/fa";

import Wrapper from "../assets/wrappers/Navbar";

const Navbar = (): ReactElement => {
  return (
    <Wrapper>
      <h2>Navbar</h2>
      <FaHome />
    </Wrapper>
  );
};

export default Navbar;
