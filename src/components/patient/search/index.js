import { Container } from 'react-bootstrap';
import SearchSection from './search-section'
import SearchBody from './search-body'
import { useParams, useSearchParams } from 'react-router-dom';

function Search() {
    const s = useParams();
    //console.log(s)
    const [searchParams, setSearchParams ] = useSearchParams();
    //console.log(searchParams.get('name'))
    return (<>
            <SearchSection />
            <SearchBody />
        </>);
}

export default Search;