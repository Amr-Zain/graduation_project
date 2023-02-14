import { useSelector } from "react-redux";
import SearchFilter from ''
function SearchResul() {
    const { searchFor ,result:{data} } = useSelector(store=>store.search);

    return ( <section className="search-body" style={{dispay:'flex'}}>
            <SearchFilter />
            </section> );
}

export default SearchResul;