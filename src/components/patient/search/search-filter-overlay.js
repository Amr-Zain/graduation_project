import SearchFilter from "./search-filter";
import SearchSection from './search-bar'
import { createPortal } from 'react-dom'

function SearchFilterOverlay({setOverlay}) {
    return createPortal(
        <>
            <aside className="search-filter-overlay">
                <SearchSection removeOverlay ={()=> setOverlay(false)}  />
                <SearchFilter overlay={true} />
            </aside>
            <div onClick={()=>{ setOverlay(false) }} className="over" style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    zIndex:"50",
                    backgroundColor: 'rgb(0 0 0 / 60%)',
                    display:'block'
                }}></div>
        </>
            ,
            document.getElementById('root2'));
}

export default SearchFilterOverlay;