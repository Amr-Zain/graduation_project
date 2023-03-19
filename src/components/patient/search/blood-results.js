import { RiStethoscopeLine } from 'react-icons/ri';
import { MdLocationPin , MdEmail} from 'react-icons/md';
import { BiMoney } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import '../../../style/appointment.css'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { DOCTOR, PROFILE } from '../../../constants/routes';
import { BsFillChatDotsFill } from 'react-icons/bs'
/* chunck shape { id: 30, number: 6, isReserved: true } */
const BloodCard = ({ id, name, bloodType, email, date })=>{
    const { for: type } = useParams();
    const navigate = useNavigate();
   
    return(
        <Col md={12} lg={6} className={'gx-2'}>
            <div className="card" onClick={()=>navigate('chat/'+id)}>
                <div className="card-content" style={{flexGrow: '1'}} >
                    <div className="name">
                        <h3 >{name} </h3>
                    </div>
                    <div className="blood-type">
                        <p><span style={{marginRight: '.2rem'}}>Blood Type:</span>{bloodType}</p>
                    </div>
                    <div> 
                        { new Date(date).toDateString()}
                    </div>
                    <div className='chat-icon'>
                        chat icon
                    </div>
                    <div className='email'>
                        <MdEmail />
                        <p onClick={(e) => {window.location.href ='mailto:'+email;}}>{email}</p>
                    </div>
                    <div className='chat-icon'>
                        <BsFillChatDotsFill />
                    </div>
                </div>
            </div>
        </Col>
);    
}

export default BloodCard;