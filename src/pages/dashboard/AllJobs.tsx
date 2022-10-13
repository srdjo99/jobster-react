import React, { ReactElement } from "react";

import { JobsContainer, SearchContainer } from "../../components";

const AllJobs = (): ReactElement => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
