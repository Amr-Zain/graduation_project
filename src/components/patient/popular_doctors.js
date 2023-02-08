import { useEffect } from "react";
import { setPopularDoctorsThunk } from "../../features/populerDoctors";
import { useDispatch, useSelector } from "react-redux";
import DoctorAbstract from "./doctorOrNurseAbstract";
const PopulerDoctors = () => {
    const { popularDoctors, isLoading, error } = useSelector((store)=>store.popularDoctors);
    const dispatch = useDispatch()
    //console.log(popularDoctors);
    const Doctors = popularDoctors.map(doctor =><DoctorAbstract key={doctor.id} {...doctor}/> )
    useEffect(()=>{
        dispatch(setPopularDoctorsThunk());
    },[]);
    return (  <div  className="popular_doctors">
        <div>الاطباء الاعلي تقيما</div>
        <div style={{display:'flex'}}className="doctors">
            {Doctors} 
        </div>
    </div>);
}

export default PopulerDoctors;