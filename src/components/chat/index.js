import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import Connections from "./Connections";
import '../../style/chat.css'
import { getConnections } from "../../features/chats";
function Chat() {
    const { imageURL, name } = useSelector((store)=>store.authedUser.user);
    const [ showConnections, setShowConnections ] = useState(false);
    const dispatch = useDispatch();
    const handleShowConnections =()=>{
        setShowConnections(prv=>!prv);
    }
    
    return ( <div className="chat">
                <div className="chat-head" onClick={handleShowConnections}>
                    <div className="img-message">
                        <div className="image">
                            <img src={imageURL} alt={name} />
                        </div>
                        <h3>Messaging</h3>
                    </div>
                    <div className="keyboard-icon">
                        { showConnections?<MdKeyboardArrowDown /> :<MdKeyboardArrowUp /> }
                    </div>
        </div>
        {
            showConnections && <Connections />
        }
    </div> );
}

export default Chat;