import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../features/search";

import '../../../style/searchfilter.css';
import RadioGroup from './radio-group';

const GENDER_OPTIONS = [
    { id: 'anyGend', value: '0', label: 'Any' },
    { id: 'male', value: '1', label: 'Male' },
    { id: 'female', value: '2', label: 'Female' },
];

const AVAILABILITY_OPTIONS = [
    { id: 'anyAval', value: '0', label: 'Any' },
    { id: 'today', value: '1', label: 'Today' },
    { id: 'tomorrow', value: '2', label: 'Tomorrow' },
];

function SearchFilter({ overlay }) {
    const { searchFor, gender, availability } = useSelector(store => store.search.filter);
    const dispatch = useDispatch();

    const handleChange = (e) => dispatch(setFilter({ [e.target.name]: e.target.value }));

    return (
        <aside className={overlay ? "filter-overlay" : "search-filter"}>
            <section className="collection">
                {(searchFor === 'doctor' || searchFor === 'nurse') && (
                    <RadioGroup
                        title="Gender"
                        name="gender"
                        options={GENDER_OPTIONS}
                        selectedValue={gender}
                        onChange={handleChange}
                    />
                )}
                <RadioGroup
                    title="Availability"
                    name="availability"
                    options={AVAILABILITY_OPTIONS}
                    selectedValue={availability}
                    onChange={handleChange}
                />
            </section>
        </aside>
    );
}


export default SearchFilter;