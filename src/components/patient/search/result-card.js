import { RiStethoscopeLine } from 'react-icons/ri';
import { MdLocationPin , MdEmail} from 'react-icons/md';
import { BiMoney } from 'react-icons/bi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';

const ResultCard = ({ type, name, imageURL, specialization, fees, location, bloodType, rating, email, phone, description })=>{
    return( <div className="card" /* onClick={handleClick} */>
    { imageURL && <img src={ imageURL } alt={`${name}`} />}
    <div className="card-content">
        <div className="name-rating">
            <h3 className="name">{type==='doctor'?'D.':''}{name} </h3>
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
                <p>description: {description}</p>
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
        <div className="contacts" >
            <div className='email'>
                <MdEmail />
                <p>{email}</p>
            </div>
            <div className='phone'>
                <IoLogoWhatsapp />
                <p>{phone}</p>
            </div>
        </div>
        
        {bloodType && <div className="blood-type">
            <p>{bloodType}</p>
        </div>
        }
    </div>
</div>
);    
}

export default ResultCard;