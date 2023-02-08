import { useEffect, useState } from "react";
import { setPopularDoctorsThunk } from "../../features/populerDoctors";
import { useDispatch, useSelector } from "react-redux";
import { getPopulerNurses } from '../../api/data'
import NurseAbstract from "./doctorOrNurseAbstract";
const PopulerNurses = () => {
    //console.log(popularDoctors);
    const [nurses,setNurses] = useState([]);
    const Nurses = nurses.map(nurse =><NurseAbstract key={nurse.id} {...nurse}/> )
    useEffect(()=>{
        const getNurses = async()=>{
            const result = await getPopulerNurses();
            setNurses(result)
        }
        getNurses()
    },[]);
    return (  <div  className="popular_doctors">
        <div>الممرضين الاعلي تقيما</div>
        <div style={{display:'flex'}}className="doctors">
            {Nurses} 
        </div>
    </div>);
}

export default PopulerNurses;