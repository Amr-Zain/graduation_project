import { useSelector } from "react-redux";

function SearchResul() {
    const { searchFor ,result:{data} } = useSelector(store=>store.search);
    
    return ( <>
    </> );
}

export default SearchResul;