import { Container } from 'react-bootstrap';
import SearchComponents from '../../components/patient/search/'
import Header from '../../components/header'
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setFilter, getCitiesAndSpecialization } from '../../features/search';
import { useSelector, useDispatch } from "react-redux";

function Search({ type }) {
    const params = useParams();
    const [ searchParams ] = useSearchParams();
    const { filter:{cities},url } = useSelector(store=>store.search)
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Search';
        const filters = { ...params, 
            bloodType: searchParams.get('bloodType'), 
            specialization:searchParams.get('specialization'), 
            name:searchParams.get('name'),sort:searchParams.get('sort'),
            gender:searchParams.get('gender'),
            availability:searchParams.get('availability')};
        dispatch(setFilter(filters))
        if(cities.length === 0) {
            dispatch(getCitiesAndSpecialization());
        }
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