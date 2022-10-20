import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAppDispatch, useAppSelector } from "../hooks/useRTK";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { numOfPages, page } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    console.log("nextPage");
  };

  const prevPage = () => {
    console.log("prevPage");
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      {pages.map((pageNumber) => {
        return (
          <button
            type="button"
            key={pageNumber}
            className={pageNumber === page ? "pageBtn active" : "pageBtn"}
            onClick={() => console.log("change page")}
          >
            {pageNumber}
          </button>
        );
      })}
      <button type="button" className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
