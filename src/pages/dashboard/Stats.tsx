import { useEffect } from "react";

import { useAppDispatch } from "../../hooks/useRTK";
import { showStats } from "../../features/allJobs/allJobsSlice";

const Stats = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);

  return <h1>Stats</h1>;
};

export default Stats;
