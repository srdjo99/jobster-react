import React, { ReactElement, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { FormRow, FormRowSelect } from "../../components";
import { AppDispatch, RootState } from "../../store";
import { handleChange, clearValues } from "../../features/job/jobSlice";

import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = (): ReactElement => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store: RootState) => store.job);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");

    // if (!position || !company || !jobLocation) {
    //   toast.error("Please fill out all fields");
    //    return;
    // }
  };

  const handleJobInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
