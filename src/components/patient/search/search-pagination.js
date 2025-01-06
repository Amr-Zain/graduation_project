import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import {  setFilter } from '../../../features/search';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import handleUrl from '../../../util/handle-url-filter';
function SearchPagination() {
    const search = useSelector( store => store.search );
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const handlePageClick = (event) => {
        dispatch(setFilter({ pageNumber: event.selected }));
        navigate(handleUrl({...search.filter, pageNumber: event.selected }));
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
                    pageCount={Math.ceil(search.result.count/search.filter.limit)}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={3}
                    previousClassName={"item previous"}
                    nextLabel={<BsFillArrowRightCircleFill style={{ fontSize: 20, width: 150 }} />}
                    previousLabel={<BsFillArrowLeftCircleFill style={{ fontSize: 20, width: 150 }} />}
                />
            </div>);
}

export default SearchPagination;