import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber, getSearchResult, setUrl } from '../../../features/search';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
function SearchPagination() {
    const { url, result: { pageNumber, limit, count }} = useSelector( store => store.search );
    const dispatch = useDispatch();
    const handlePageClick = (event) => {
        console.log(event)
        dispatch(setPageNumber({ pageNumber: event.selected }));
        //dispatch(setUrl())
        //dispatch(getSearchResult());
    }
    return ( <div className='paginate'>
                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    nextClassName={"item next "}
                    onPageChange={handlePageClick}
                    pageCount={/* Math.ceil(count/limit) */100}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    nextLabel={<BsFillArrowRightCircleFill style={{ fontSize: 25, width: 150 }} />}
                    previousLabel={<BsFillArrowLeftCircleFill style={{ fontSize: 25, width: 150 }} />}
                />
            </div>);
}

export default SearchPagination;