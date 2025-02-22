import { useSelector } from "react-redux";

function DoctorInfo() {
    const { user } = useSelector( state=>state.authedUser);
    return ( <div>
                <div>
                    <img style={{width:'10rem',height:'10rem', borderRadius:'50%'}} src={ user.imageURL || './images/avatars/default.png' } alt={`Dr.${user.name}`}/>
                </div>
                <div>
                    <h3>{`Dr.${user.name}`}</h3>
                </div>
    
            </div> );
}

export default DoctorInfo;