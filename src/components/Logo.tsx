import { FC, ReactElement } from "react";

import logo from "../assets/images/logo.svg";

const Logo: FC = (): ReactElement => {
  return <img src={logo} alt="jobster logo" className="logo" />;
};

export default Logo;
