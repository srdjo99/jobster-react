import { useEffect } from "react";

import { showStats } from "../../features/allJobs/allJobsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRTK";
import { Loading, StatsContainer, ChartsContainer } from "../../components";

const Stats = () => {
  const dispatch = useAppDispatch();
  const { isLoading, monthlyApplications } = useAppSelector(
    (store) => store.allJobs,
  );

  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
