import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat, getConnections } from "../../features/chats";
import Chatbox from "./chatbox";

function Connections() {
    const { connections } = useSelector((store)=>store.chats);
    const [ openChat, setOpenChat ] = useState({show:false, id:'',name:'', img:''});
    const dispatch = useDispatch();

    const handleConnectionClick = (connection)=>{
        //dispatch(getChat(connection.id));
        setOpenChat({show:true, ...connection});
    }
    useEffect(()=>{
        if(!connections.length)dispatch(getConnections());
    },[])
    const ConnectionsList = connections.map((connection)=>{
        return(
            <div className="connection" onClick={()=>handleConnectionClick(connection)}>
                <div className="image">
                    <img src={connection.img} alt={connection.name} />
                </div>
                <div className="content">
                    <h3 className="name">
                        {connection.name}
                    </h3>
                    <p className="last-message"> {connection.lastMessage.length>52?
                    connection.lastMessage.substring(0,52)+'...':connection.lastMessage}</p>
                </div>
            </div>
        );
    })
    return ( <>
                <div className="connections">
                    {ConnectionsList}
                </div>
                { openChat.show && <Chatbox {...openChat} setOpenChat={setOpenChat} />}
            </>);
}

export default Connections;