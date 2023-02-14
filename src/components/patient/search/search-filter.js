import { useSelector } from "react-redux";


const texts = {
    gender: { ar:'النوع', eng:'Gender' },
    male: {ar:'رجل',eng:'Male'},
    felmale: {ar:'مراه',eng:'Felmale'},
    availability:{ar:'متاح', eng:'Availability'},
    any: {ar:'الكل',eng:'Any'},
    today: {ar:'اليوم',eng:'Today'},
    tomorrow: {ar:'الغد',eng:'Tomorrow'},
}

function SearchFilter() {
    const { searchFor } = useSelector(store=>store.search);
    console.log(searchFor)
    return ( <aside className="search-filter">

               { (searchFor ==='doctor'|| searchFor === 'nurse') && 
                    <div className="gender">
                        <h3>{true ? texts.gender.eng:texts.gender.ar}</h3>
                        <div className="male">
                            <input type = 'checkbox' 
                                    id='male' 
                                    name='male' 
                                    value='male'
                            />
                            <lable HtmlFor='male'> {true ? texts.male.eng:texts.male.ar}</lable>
                        </div>
                        <div className="female">
                            <input type = 'checkbox' 
                                    id = 'female' 
                                    name = 'female' 
                                    value='female' 
                            />
                            <lable HtmlFor='female'> {true ? texts.felmale.eng:texts.felmale.ar}</lable>
                        </div>
                    </div>
                }

                <div className="availability">
                    <h3>{true ? texts.availability.eng:texts.availability.ar}</h3>
                    <div className="any">
                        <input type = 'checkbox' 
                                id='any' 
                                name='any' 
                                value='any' />
                        <lable HtmlFor='any'>  {true ? texts.any.eng:texts.any.ar}</lable>
                    </div>
                    <div  className="today">
                        <input type = 'checkbox' 
                                id='today' 
                                name='today' 
                                value='today' />
                        <lable HtmlFor='today'>  {true ? texts.today.eng:texts.today.ar}</lable>
                    </div>
                    <div className="tomorrow">
                        <input type = 'checkbox' 
                                id = 'tomorrow' 
                                name = 'tomorrow' 
                                value='tomorrow' />
                        <lable HtmlFor='tomorrow'>  {true ? texts.tomorrow.eng:texts.tomorrow.ar}</lable>
                    </div>
                </div>
            </aside> );
}

export default SearchFilter;