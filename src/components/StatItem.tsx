import { FC } from "react";

import Wrapper from "../assets/wrappers/StatItem";
import { IStatItemProps } from "../types/IStats";

const StatItem: FC<IStatItemProps> = ({ title, count, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
