import { useSelector, useDispatch } from "react-redux";
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { useEffect } from "react";
import SearchFilter from "./search-filter";
import { getCitiesAndSpecialization, setFilter } from "../../../features/search";
import { createPortal } from 'react-dom'
import '../../../style/search-filter.css'

function SearchFilterOverlay({setOverlay}) {
    const { searchFor,cities, specializations } = useSelector(store=>store.search);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!cities.length) dispatch(getCitiesAndSpecialization());
    })
    return createPortal(
        <>
            <aside className="search-filter-overlay">
                <div className='city'>
                    <DatalistInput
                        id="city"
                        name='city'
                        placeholder="المدينه"
                        onSelect={(value) =>dispatch(setFilter( { city: value })) }
                        items={cities}
                    /> 
                </div>
                    {
                        searchFor == 'doctor'&& 
                        <div className='specialization'>
                            <DatalistInput
                                id="specialization"
                                name='specialization'
                                placeholder="التخصص"
                                onSelect={(value) =>dispatch(setFilter( { specialization: value })) }
                                items={specializations}
                            /> 
                        </div>
                    }
                    { 
                        (searchFor == 'blood donator'|| searchFor == 'blood request') && 
                        <div className='blood-type'>
                            <select name='bloodType' onChange={(e)=>dispatch(setFilter({bloodType:e.target.value}))} >
                                <option >A+</option>
                                <option >A-</option>
                                <option >B+</option>
                                <option >B-</option>
                                <option >O+</option>
                                <option >O-</option>
                                <option >AB+</option>
                                <option >AB-</option>
                            </select>
                        </div>
                    }
                <SearchFilter overlay={true} />
                <button onClick={()=>setOverlay(false)}>done</button>
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