import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiagnosis, changeFilterCategory, setFilterByDoctor, setFilterDate } from '../../features/medicalHistory';
import Diagnosis from "./diagnosis";
import Select from 'react-select'

const dates =[
    {value:0,label:'Last 6 Month'},
    {value:1,label:'Last year'},
    {value:2,label:'Last 2 years'},
    {value:3,label:'All'},
]
export default function DiagnosisList({ patientId }){
    const dispatch = useDispatch();
    const { medicalHistory:{ 
                    diagnosis:{ data:diagnosis, patientDiagnosisCategories, isLoading, error }, 
                    filters: { date, selectedCategories, byDoctor }
                    },
            authedUser:{ 
                user: { userType }
                } 
            } = useSelector(store=>store);
    const handleCategChange =(items)=>{
        console.log(typeof changeFilterCategory)
        dispatch(changeFilterCategory({ categories: items?.map(i=>i?.label) }))
    }
    const HandelSearch = ()=>{
        dispatch(getDiagnosis({ type: 'diagnosisList', patientId, daignosisId: null }));
    }
    useEffect(()=>{
        if(patientDiagnosisCategories.length === 0 ) dispatch(getDiagnosis({type:'categories', patientId: null, daignosisId: null }));
    },[]);
    function renderDiagnosis(){
        const diagList = diagnosis.map(diag=>(<Diagnosis key={diag.id} {...diag} />));
        if(isLoading) return <>Loading</>
        if(error) return <> Error: {error}</>
        return diagList;
    }
    return(<div className="diagnosis-list">
            <div className="filters">
                <div className="Specializations">
                    <Select 
                        isMulti={true} 
                        placeholder={'Specializations'}
                        options= { patientDiagnosisCategories } 
                        onChange ={handleCategChange} 
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
                        onChange ={(item)=>dispatch(setFilterDate({ date: item.value}))} 
                        value = { dates.filter(option => date===option.value)[0]}
                            
                        />
                </div>
                {userType ==='doctor'&&<div className="by-doctor-check">
                    <input 
                        type={'checkbox'}
                        name='loggedin doctor'
                        checked ={byDoctor}
                        onChange={(e)=>dispatch(setFilterByDoctor({ byDoctor: e.target.checked}))}
                    /><label>By you</label>
                </div>}
                <div className="search-btn">
                    <button onClick={HandelSearch}>Search</button>
                </div>
            </div>
            <div className="diagnosis-container">
                {renderDiagnosis()}

            </div>
        </div>);    
}