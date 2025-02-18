import { RiStethoscopeLine } from 'react-icons/ri';
import { MdLocationPin , MdEmail} from 'react-icons/md';
import { BiMoney } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import '../../../style/appointment.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { BsFillChatDotsFill } from 'react-icons/bs'
import { PROFILE } from '../../../constants/routes';
/* chunck shape { id: 30, number: 6, isReserved: true } */
const ResultCard = ({ isPage, id, name, imageURL, specialization, fees,
    location,  rating, email, description })=>{
        const [searchParams] = useSearchParams();
        const type = searchParams.get('searchFor');
    const navigate = useNavigate();
   
    return(
        <Col md={12} lg={isPage?12:6} className={'gx-2'}>
            <div className="card" onClick={()=>navigate(PROFILE+'/'+type+'/'+id)}>
                <div className="image-top">
                    <Link to={`${PROFILE}/${type}/${id}`}><img src={ imageURL } alt={`${name}`} /> </Link>
                </div>
                <div className="card-content" style={{flexGrow: '1'}} >
                    <div className="name">
                        <h3 >{type==='doctor'?'Dr.':''}{name} </h3>
                    </div>
                    <div className="rating">
                        <span  className="star">
                            <AiFillStar />
                        </span>
                        <span className="rating-value">{rating}</span>
                    </div>
                    {type ==='doctor' &&<div className="specialization" >
                        <RiStethoscopeLine />
                        <p>{specialization}</p>
                    </div>}
                    {description&&<div className="description" >
                        <p>{description}</p>
                    </div>}
                    {location&&<div className="location" >
                        <MdLocationPin className="location-icon" />
                        <p>{location}</p>
                    </div>}
                    <div className="fees" >
                        <BiMoney  className="fees-icon"/>
                        <p>{fees}</p>
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

export default ResultCard;