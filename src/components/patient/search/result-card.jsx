import { RiStethoscopeLine } from 'react-icons/ri';
import { MdLocationPin , MdEmail} from 'react-icons/md';
import { BiMoney } from 'react-icons/bi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';
import '../../../style/appointment.css'
import { Link } from 'react-router-dom';

const ResultCard = ({ type, name, imageURL, specialization, fees, location, bloodType, rating, email, phone, description })=>{
    return( <div className="card" /* onClick={handleClick} */>
    <div className="image-top">
    { imageURL && <img src={ imageURL } alt={`${name}`} />}
    </div>
  
    <div className="card-content">
        <div className="name">
            <h3 >{type==='doctor'?'D.':''}{name} </h3>
        </div>
        <div className="rating">
            <span  className="star">
                <AiFillStar />
            </span>
            <span className="rating-value">{rating}</span>
        </div>
        { (type === 'doctor' || type === 'nurse') &&
        <> 
            {specialization &&<div className="specialization" >
                <RiStethoscopeLine />
                <p>{specialization}</p>
            </div>}
            <div className="description" >
                <p>{description}</p>
            </div>
            <div className="location" >
                <MdLocationPin className="location-icon" />
                <p>{location}</p>
            </div>
            <div className="fees" >
                <BiMoney  className="fees-icon"/>
                <p>{fees}</p>
            </div> 
        </>}
        
        {bloodType && <div className="blood-type">
            <p>{bloodType}</p>
        </div>
        }
        <div className='email'>
            <MdEmail />
                <p onClick={(e) => {window.location.href ='mailto:'+email;}}>{email}</p>

        </div>
        
    </div>
</div>
);    
}

export default ResultCard;