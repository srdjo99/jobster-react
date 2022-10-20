import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useAppSelector } from "../hooks/useRTK";
import { IDefaultStats } from "../types/IStats";

const StatsContainer = () => {
  const { stats } = useAppSelector((store) => store.allJobs);

  const defaultStats: IDefaultStats[] = [
    {
      title: "pending applications",
      count: stats.pending ?? 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview ?? 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined ?? 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
