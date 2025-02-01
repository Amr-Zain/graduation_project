import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Diagnosis from "../../components/medical-history/diagnosis";
import Medicines from "../../components/medical-history/medicines";
import '../../style/medical-history.css'
import { useDispatch, useSelector } from "react-redux";
import { getDiagnosis, selectDiagnosisById } from "../../features/medicalHistory";
function DetailedDiagnosis() {
    const { diagnosisId, patientId } = useParams();
    const diagnosis = useSelector(selectDiagnosisById(diagnosisId));//search in the store first
    const { isLoading, error } = useSelector(state=>state.medicalHistory.diagnosis);
    const dispatch = useDispatch();
    useEffect(()=>{
        document.title = 'Diagnosis';
        if(!diagnosis){
            dispatch(getDiagnosis({type:'diagnosis',diagnosisId, patientId}));
        }
    },[diagnosisId, patientId]);
    console.log(isLoading,error,diagnosis)
    if(isLoading) return <main>
                            <div style={{textAlign:'center'}}>Loading...</div>
                        </main>
    if(error) return <main>
                            <div style={{textAlign:'center',color:'red'}}>Error:{error}</div>
                        </main>
    if(!diagnosis) return <main>
                                <h2 style={{textAlign:'center'}}>Diagnosis Not Found</h2>
                            </main>
    return ( <>
            <main className="detailed-diagnosis">
                <Container>
                    <Diagnosis {...diagnosis} isPage  >
                        {
                            diagnosis?.medicine?.length !==0?
                            <Medicines medicines = {diagnosis.medicine} isDiagnosis/>
                            :
                            <p>There No Medicines</p>
                        }
                    </Diagnosis>
                </Container>
            </main>
            </>);
}

export default DetailedDiagnosis;