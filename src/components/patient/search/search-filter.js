import { useSelector, useDispatch } from "react-redux";
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { useEffect, useState } from "react";
import { getCitiesAndSpecialization, setFilter } from "../../../features/search";
import { createPortal } from 'react-dom'
import '../../../style/search-filter.css'

function SearchFilter({ overlay }) {
    const { searchFor,cities, specializations } = useSelector(store=>store.search);
    const dispatch = useDispatch();
    console.log(searchFor)
    return( <aside className={overlay?"filter-overlay":"search-filter"}>
                    
                    { (searchFor ==='doctor'|| searchFor === 'nurse') && 
                        <div className="gender">
                            <h3>Gender</h3>
                            <div className="male">
                                <input type = 'checkbox' 
                                        id='male' 
                                        name='male' 
                                        value='male'
                                />
                                <lable HtmlFor='male'> Male</lable>
                            </div>
                            <div className="female">
                                <input type = 'checkbox' 
                                        id = 'female' 
                                        name = 'female' 
                                        value='female' 
                                />
                                <lable HtmlFor='female'>Felmale</lable>
                            </div>
                        </div>
                    }
                    <div className="availability">
                        <h3>Availability</h3>
                        <div className="any">
                            <input type = 'checkbox' 
                                    id='any' 
                                    name='any' 
                                    value='any' />
                            <lable HtmlFor='any'>Any</lable>
                        </div>
                        <div  className="today">
                            <input type = 'checkbox' 
                                    id='today' 
                                    name='today' 
                                    value='today' />
                            <lable HtmlFor='today'>Today</lable>
                        </div>
                        <div className="tomorrow">
                            <input type = 'checkbox' 
                                    id = 'tomorrow' 
                                    name = 'tomorrow' 
                                    value='tomorrow' />
                            <lable HtmlFor='tomorrow'>Tomorrow</lable>
                        </div>
                    </div>
                </aside>);
}

export default SearchFilter;