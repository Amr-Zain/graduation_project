import { Container } from 'react-bootstrap';
import SearchSection from '../../components/patient/search-section'
import SearchBody from '../../components/patient/search/search-body'
import { useParams, useSearchParams } from 'react-router-dom';

function Search() {
    const s = useParams();
    console.log(s)
    const [searchParams, setSearchParams ] = useSearchParams();
    console.log(searchParams.get('name'))
    return (<main>
        <Container>
            <SearchSection />
            <SearchBody />
        </Container>
        {/* <button onClick={()=>{setSearchParams({SortBy:1, name:'zain'})}}>click</button> */}
    </main>);
}

export default Search;