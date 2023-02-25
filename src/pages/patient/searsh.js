import { Container } from 'react-bootstrap';
import SearchComponents from '../../components/patient/search/'
import Header from '../../components/header'
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setFilter } from '../../features/search'; 
import { useSelector, useDispatch } from "react-redux";

function Search({ type }) {
    const params = useParams();
    const [ searchParams ] = useSearchParams();
    const { url } = useSelector(store=>store.search);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Search';
        const filters = { ...params, 
            bloodType: searchParams.get('bloodType')? searchParams.get('bloodType'):'A+', 
            specialization: searchParams.get('specialization')? searchParams.get('specialization'):'', 
            name: searchParams.get('name'),
            sort: searchParams.get('sort')? searchParams.get('sort'):'0',
            gender: searchParams.get('gender')? searchParams.get('gender'):'0',
            availability: searchParams.get('availability')? searchParams.get('availability'):'0',};
        dispatch(setFilter(filters))
    }, [ url, params, searchParams ]);
    return (
        <>
            <Header />
            <main>
                <Container>
                    <SearchComponents />
                </Container>
            </main>
        </>
        );
}

export default Search;