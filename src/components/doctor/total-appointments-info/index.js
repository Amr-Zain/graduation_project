import { useEffect, useState } from "react";
import { FaUserMd } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import { getTotal, getTotalPatientsCount } from "../../../api/data";

function Info({ isTotal }) {
    const [count, setCount] = useState(0)
    useEffect(()=>{
            (async()=>{
                const value = await getTotal(isTotal);
                console.log(value)
                setCount(value);
            })();
    },[])
    return (   
            <div style={{display:'flex', alignItems:'center'}}>
                <div style={{color:'var(--main-blue-vesion2)',fontSize:'10rem'}}>
                    {isTotal?<FaUserMd />:<MdSchedule />}
                </div>
                <div>
                    <h3>{isTotal?'Total Patients':'Today Appointments'}</h3>
                    <span>{count}</span>
                </div>
            </div>
        );
}

export default Info;