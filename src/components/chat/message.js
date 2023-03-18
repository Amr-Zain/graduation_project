import { useSelector } from "react-redux";
import useDate from "../../hooks/useDate";

function Message({ id, message, date, from, to }) {
    const { id:currentUserId } = useSelector(store=>store.authedUser.user);
    return ( <div style={{width:'100%', display:'flex',flexDirection:currentUserId === from ?'row-reverse':'row'}}>
                <div  className={`message ${currentUserId === from ? 'current-user':''}`}>
                    <p>{message}</p>
                    <span>{useDate(date)}</span>
                </div>
            </div> );
}

export default Message;