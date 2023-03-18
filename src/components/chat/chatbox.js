import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "./chat-input";
import { MdOutlineClose } from 'react-icons/md'
import Message from "./message";
import ScrollableFeed from 'react-scrollable-feed'
function Chatbox({ show, id, name, img, setOpenChat }) {
    const dispatch = useDispatch();
    const messages = useSelector(store=>store.chats.messages);
    const MessagesList = messages.map(message=><Message key={message.id} {...message} />)
    const closeChatbox = ()=>{
        setOpenChat(prv=>({...prv, show:false}))
    }
    useEffect(()=>{
        //dispatch(getChat({ id }));
    },[id])
    return ( <div className="chatbox"  >
                <div style={{ cursor: 'default'}} className="chat-head" >
                    <div className="img-message">
                        <div className="image">
                            <img src={img} alt={name} />
                        </div>
                        <h3>{name}</h3>
                    </div>
                    <div className="keyboard-icon" onClick={closeChatbox}>
                        <MdOutlineClose /> 
                    </div>
                </div>
                <ScrollableFeed className="messages" forceScroll={true}>
                    {MessagesList}
                </ScrollableFeed>
                <ChatInput userChatId={id}/>
            </div> );
}

export default Chatbox;