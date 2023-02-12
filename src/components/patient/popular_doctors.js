import { useEffect } from "react";
import { setPopularDoctorsThunk } from "../../features/populerDoctors";
import { useDispatch, useSelector } from "react-redux";
import DoctorAbstract from "./doctorOrNurseAbstract";
import '../../style/popular_doctors.css';
const PopulerDoctors = () => {
    const { popularDoctors, isLoading, error } = useSelector((store)=>store.popularDoctors);
    const dispatch = useDispatch()
    //console.log(popularDoctors);
    const Doctors = popularDoctors.map(doctor =><DoctorAbstract key={doctor.id} {...doctor}/> )
    useEffect(()=>{
        dispatch(setPopularDoctorsThunk());
    },[]);
    return (  <section  className="popular-doctors" >
                <div className="popular">الاطباء الاعلي تقيما</div>
                <div style={{display:'flex', overflowX:'scroll'}}className="doctors">
                    {Doctors} 
                </div>
            </section>
    );
}

export default PopulerDoctors;