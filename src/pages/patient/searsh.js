import { Container } from 'react-bootstrap';
import SearchComponents from '../../components/patient/search/'
import Header from '../../components/header'
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function Search({ type }) {
    const s = useParams();
    console.log(s)
    const [searchParams, setSearchParams ] = useSearchParams();
    console.log(searchParams.get('sort'))
    
    return (
        <>
            <Header />
            <main>
                <Container>
                    <SearchComponents />
                </Container>
                <button onClick={()=>{setSearchParams({S:1, name:"zain"})}}>click</button>
            </main>
        </>
        );
}

export default Search;