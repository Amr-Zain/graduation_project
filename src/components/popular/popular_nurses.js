import { useEffect, useState } from "react";
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
    return (  <section  className="popular-nurses">
                <div className="popular"> Top Rated Nurses </div>
                <div style={{display:'flex', overflowX:'scroll'}}className="nurses">
                    {Nurses} 
                </div>
            </section>);
}

export default PopulerNurses;