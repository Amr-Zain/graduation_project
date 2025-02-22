import { RiMenu3Line } from "react-icons/ri";
import { FiMessageCircle } from "react-icons/fi";

function Header() {
    return (<header style={{width:'100%',height:'5rem', display:'flex',justifyContent:'space-between'}}>
        <h2>
            Dashboad
        </h2>
        <div style={{display:'flex',gap:'1rem',fontSize:'2rem'}}>
            <div><FiMessageCircle /></div>
            <div><RiMenu3Line /></div>
        </div>
    </header>  );
}

export default Header;