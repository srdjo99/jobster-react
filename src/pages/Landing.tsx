import { FC, ReactElement } from "react";

import logo from "../assets/images/logo.svg";

const Landing: FC = (): ReactElement => {
  return (
    <main>
      <nav>
        <img src={logo} alt="jobster logo" className="logo" />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            numquam soluta odit, quia possimus quas excepturi pariatur
            doloremque saepe voluptates.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <div />
      </div>
    </main>
  );
};

export default Landing;
