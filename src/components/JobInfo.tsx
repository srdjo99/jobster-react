import { ReactElement } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

interface IJobInfoProps {
  icon: ReactElement;
  text: string;
}

const JobInfo = ({ icon, text }: IJobInfoProps) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
