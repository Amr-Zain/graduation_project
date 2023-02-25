import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber, getSearchResult, setUrl, setFilter } from '../../../features/search';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
function SearchPagination() {
    const { url, filter: { limit }, result:{ count }} = useSelector( store => store.search );
    const dispatch = useDispatch();
    const handlePageClick = (event) => {
        dispatch(setFilter({ pageNumber: event.selected }));
        dispatch(setUrl({ url: url+`&page=${event.selected }`}))
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
                    pageCount={Math.ceil(count/limit)}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={3}
                    previousClassName={"item previous"}
                    nextLabel={<BsFillArrowRightCircleFill style={{ fontSize: 20, width: 150 }} />}
                    previousLabel={<BsFillArrowLeftCircleFill style={{ fontSize: 20, width: 150 }} />}
                />
            </div>);
}

export default SearchPagination;