import { Container } from 'react-bootstrap';
import SearchSection from '../../components/patient/search-section'
import SearchResluts from '../../components/patient/search-result'
import { useParams } from 'react-router-dom';

function Search() {
    const s = useParams();
    console.log(s)
    return (<main>
        <Container>
            <SearchSection />
            <SearchResluts />
        </Container>
    </main>);
}

export default Search;