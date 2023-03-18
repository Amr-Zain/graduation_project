import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { AddAppointment } from "../../api/data";
import { addMessages } from "../../features/chats";

export default function ChatInput({ userChatId }) {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const dispatch = useDispatch();
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const userId = useSelector(store=>store.authedUser.user.id);
    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            dispatch(addMessages({messages:[{id: 'daggskljf', from: userId, to: userChatId, date:Date.now(),message: msg }]}))
            //handleSendMsg(msg);
            setMsg("");
        }
    };

    return (
        <div className="chat-input">
            <div className="button-container">
                <div className="emoji">
                <BsEmojiSmile onClick={handleEmojiPickerhideShow} />
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                type="text"
                placeholder="type your message here"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
        );
}