import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../features/search";

import '../../../style/searchfilter.css';
import Input from "./input";
function SearchFilter({ overlay }) {
    const { searchFor, gender, availability  } = useSelector(store=>store.search.filter);
    const dispatch = useDispatch();
    const handleChange = (e)=>dispatch(setFilter({[e.target.name]:e.target.value}))
    return( <aside className={overlay?"filter-overlay":"search-filter"}>
                <section className="collection">
                    { (searchFor ==='doctor'|| searchFor === 'nurse') && 
                        <div className="gender">
                            <h3>Gender</h3>
                            <Input className="any-gender" type ='radio' id ='any' name = 'gender' value ='0' checked = {gender} handleChange ={handleChange} />
                            <Input  className="male" type ='radio' id ='male' name = 'gender' value ='1' checked = {gender} handleChange ={handleChange} />
                            <Input className="female" type ='radio' id ='female' name = 'gender' value ='2' checked = {gender} handleChange ={handleChange} />
                        </div>
                    }
                    <div className="availability">
                        <h3>Availability</h3>
                        <Input className="availability-any" type ='radio' id ='any' name = 'availability' value ='0' checked = {availability} handleChange ={handleChange} />
                        <Input className="today" type ='radio' id ='today' name = 'availability' value ='1' checked = {availability} handleChange ={handleChange} />
                        <Input className="tomorrow" type ='radio' id ='tomorrow' name = 'availability' value ='2' checked = {availability} handleChange ={handleChange} />
                     </div>
                </section>
            </aside>);
}

export default SearchFilter;