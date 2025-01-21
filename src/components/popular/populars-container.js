import Abstract from "./doctorOrNurseAbstract";
import '../../style/popular_doctors.css';
 
const PopulersContainer = ({ DoctorsOrNurses, isLoading, type }) => {
    const Carts = DoctorsOrNurses.map(items =><Abstract key={items.id} {...items}/> )
    return (  <section  className={`popular-${type}`.toLocaleLowerCase()} >
                <div className="popular"> Top Rated {type} </div>
                <div style={{display:'flex', overflowX:'scroll'}} className={type.toLocaleLowerCase()}>
                    {isLoading? "loading": Carts} 
                </div>
            </section>
    );
}

export default PopulersContainer;