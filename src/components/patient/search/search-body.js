import { useSelector } from "react-redux";
import SearchFilter from './search-filter';
import SearchResults from './search-results';

function SearchBody() {
    //const { searchFor ,result:{data} } = useSelector(store=>store.search);

    return ( <section className="search-body" style={{display:'flex',justifyContent:'space-between'}}>
                <SearchFilter />
                <SearchResults />
            </section> );
}

export default SearchBody;