import React, { useState } from "react";
import { FiMic, FiImage, FiSend } from "react-icons/fi";
import { useContext } from "react";
import MyContext from "../../controller/myContext";
import callGemini from "../../controller/geminiAPI";

const MainField = () => {
	const context = useContext(MyContext);
	const { addChat, chats } = context;
	const [userMessage, setUserMessage] = useState("");

	const handleSendMessage = () => {
		if (userMessage.trim() !== "") {
			const message = {
				role: "user",
				parts: [{ text: userMessage }],
			};
			addChat(message);
			setUserMessage("");
			callGemini([...chats, message], context);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	return (
		<div className="fieldContainer">
			<div className="inputWrapper">
				<div className="iconLeftGroup">
					<FiMic className="icon" />
					<FiImage className="icon" />
				</div>
				<input
					type="text"
					placeholder="Type your message..."
					value={userMessage}
					onChange={(e) => setUserMessage(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<FiSend className="icon sendIcon" onClick={handleSendMessage} />
			</div>
		</div>
	);
};

export default MainField;
