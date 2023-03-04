import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../features/search";

import '../../../style/searchfilter.css';
function SearchFilter({ overlay }) {
    const { searchFor, gender, availability  } = useSelector(store=>store.search.filter);
    const dispatch = useDispatch();
    const handleChange = (e)=>dispatch(setFilter({[e.target.name]:e.target.value}))

    return( <aside className={overlay?"filter-overlay":"search-filter"}>
            <section className="collection">
                    { (searchFor ==='doctor'|| searchFor === 'nurse') && 
                   
                        <div className="gender">
                            <h3>Gender</h3>
                            <div className="any-gender">
                                <input type = 'radio' 
                                        id='any-gender' 
                                        name='gender' 
                                        value='0'
                                        checked = {gender === '0'}
                                        onChange={ handleChange }
                                />
                                <label htmlFor='any-gender'> Any</label>
                            </div>
                            <div className="male">
                                <input type = 'radio' 
                                        id='male' 
                                        name='gender' 
                                        checked = {gender === '1'}
                                        value='1'
                                        onChange={ handleChange }
                                />
                                
                                <label htmlFor='male'> Male</label>
                            </div>
                            <div className="female">
                                <input type = 'radio' 
                                        id = 'female' 
                                        name = 'gender' 
                                        checked = { gender === '2' }
                                        value='2' 
                                        onChange={ handleChange }
                                />
                                <label htmlFor='female'>Felmale</label>
                            </div>
                        </div>
                    }
                    <div className="availability">
                        <h3>Availability</h3>
                        <div className="availability-any">
                            <input type = 'radio' 
                                    id='availability-any' 
                                    name='availability' 
                                    value='0'
                                    checked = {availability === '0'}
                                    onChange={ handleChange } />
                            <label htmlFor='availability-any'>Any</label>
                            
                        </div>
                        <div  className="today">
                            <input type = 'radio' 
                                    id='today' 
                                    name='availability' 
                                    value='1' 
                                    checked = {availability === '1'}
                                    onChange={ handleChange }/>
                            <label htmlFor='today'>Today</label>
                        </div>
                        <div className="tomorrow">
                            <input type = 'radio' 
                                    id = 'tomorrow' 
                                    name = 'availability' 
                                    value='2'
                                    checked = {availability === '2'}
                                    onChange={ handleChange }/>
                            <label htmlFor='tomorrow'>Tomorrow</label>
                        </div>
                     </div>
                  </section>
                </aside>);
}

export default SearchFilter;