import { FC, ReactElement } from "react";

import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index";

import main from "../assets/images/main.svg";

const Landing: FC = (): ReactElement => {
  return (
    <Wrapper>
      <nav>
        <Logo />
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
        <img src={main} alt="successful deal" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
