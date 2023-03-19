
import propType from "prop-type";
import { useNavigate } from "react-router-dom";
import { DOCTOR, NURSE, PROFILE } from '../../constants/routes';
import { AiFillStar } from "react-icons/ai";

const Card = ({ id, imageURL, name, rating, specialization}) => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        if(specialization){
            navigate(PROFILE+DOCTOR+`/${id}`)
        }else{
            navigate(PROFILE+NURSE+`/${id}`)
        }
    }
    return( <div className="card" onClick={handleClick}>
        <img src={ imageURL } 
            alt={ `${name}` } />
        <div className="card-content">
            {specialization && <p className="specialization" >Specialization: {specialization}</p>}
            <div className="name-rating">
                <h3 className="name">{ name }</h3>
                    <div className="rating">
                        <span  className="star">
                            <AiFillStar />
                        </span>
                        <span className="rating-value">{rating}</span>
                    </div>
            </div>
        </div>
    </div>
)    

}
export default Card
