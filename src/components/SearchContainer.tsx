import FormRow from "./FormRow";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppDispatch, useAppSelector } from "../hooks/useRTK";
import FormRowSelect from "./FormRowSelect";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job,
  );
  const dispatch = useAppDispatch();

  const handleSearch = (e: any) => {};
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type  */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            type="button"
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
