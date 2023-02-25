import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDiagnosis, setDate_category } from '../../features/medicalHistory';
import Diagnosis from "./diagnosis";
import Select from 'react-select'

const dates =[
    {value:0,label:'Last 6 Month'},
    {value:1,label:'Last year'},
    {value:2,label:'Last 2 years'},
    {value:3,label:'All'},
]
export default function DiagnosisList(){
    const dispatch = useDispatch();
    const { diagnosis:{data:diagnosis, patientDiagnosisCategories, isLoading }, date, selectedCategories } = useSelector(store=>store.medicalHistory);
    console.log(selectedCategories)
    const diagList = diagnosis.map(diag=>(<Diagnosis key={diag.id} {...diag} />));
    const handleCategChange =(items)=>{
        
        dispatch(setDate_category({ selectedCategories: items.map(i=>i.label)}))
    }
    const HandelSearch = ()=>{
        dispatch(setDiagnosis({ type: 'diagnosis',selectedCategories, date}));
    }
    useEffect(()=>{
        
        console.log(patientDiagnosisCategories)
        if(patientDiagnosisCategories.length === 0 ) dispatch(setDiagnosis({type:'categories'}));
        dispatch(setDiagnosis())
    },[]);
    return(<div className="diagnosis-list">
            <div className="filters">
                <div className="Specializations">
                    <Select 
                        isMulti={true} 
                        placeholder={'Specializations'}
                        options= { patientDiagnosisCategories } 
                        onChange ={handleCategChange} 
                        /* defaultInputValue ={selectedCategories} */
                        value = {
                            patientDiagnosisCategories.filter(option => 
                                selectedCategories.includes( option.label))
                            }
                        />
                </div>
                <div className="date">
                    <Select  
                        options= { dates } 
                        placeholder={'date'}
                        onChange ={(item)=>dispatch(setDate_category({ date: item.value}))} 
                        value = { dates.filter(option => date===option.value)[0]}
                            
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