import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDiagnosisAndMedicines, setDate_category } from '../../features/medicalHistory';
import Diagnosis from "./diagnosis";
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import Select from 'react-select'
export default function DiagnosisList(){
    const dispatch = useDispatch();
    const { diagnosis, patientDiagnosisCategoy, date } = useSelector(store=>store.medicalHistory);
    console.log(diagnosis)
    const diagList = diagnosis.map(diag=>(<Diagnosis key={diag.id} {...diag} />));
    const handleCategChange =(items)=>{
        let value ='';
        items.forEach(item=>value +=item.id+'_');
        console.log(value)
        dispatch(setDate_category({ selectedCategories: value}))
    }
    const HandelSearch = ()=>{
        dispatch(setDiagnosisAndMedicines('diagnosis'));
    }
    const dates =[
        {value:0,label:'Last 6 Month'},
        {value:1,label:'Last year'},
        {value:2,label:'Last 2 years'},
        {value:3,label:'All'},
    ]
    useEffect(()=>{
        dispatch(setDiagnosisAndMedicines('both'));
    },[]);
    return(<div className="diagnosis-list">
            <div className="filters">
                <div className="Specializations">
                    <Select 
                        isMulti={true} 
                        placeholder={'Specializations'}
                        options= { patientDiagnosisCategoy } 
                        onChange ={handleCategChange} 
                        />
                </div>
                <div className="date">
                    <Select  
                        options= { dates } 
                        placeholder={'date'}
                        onChange ={(item)=>dispatch(setDate_category({ date: item.value}))} 
                        />
                </div>
                <div className="search-btn">
                    <button onClick={HandelSearch}>Search</button>
                </div>
            </div>
            <div className="diagnosis-container">
                {diagList}
            </div>
        </div>);    
}