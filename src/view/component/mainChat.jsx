import React, { useEffect, useRef } from "react";
import { FiVolume2, FiCopy, FiRefreshCcw, FiSave } from "react-icons/fi";
import pawIcon from "../../assets/paw.png";
import { textTospeech, stopSpeaking } from "../../controller/textTospeech";
import { copyText } from "../../controller/copyText";
import { useChat } from "../../context/chatContext";
import ReactMarkdown from "react-markdown";
import { updateChatHistory } from "../../firebase/function/update/updateChatHistory";

const MainChat = () => {
	const chatContainerRef = useRef(null);
	const { petDetails, chatHistory, isThinking, regenerateChat } = useChat();

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chatHistory]);

	if (!chatHistory || chatHistory.length === 0) return null;

	const handleSaveChat = (text) => {
		if (petDetails && petDetails.id) {
			updateChatHistory(petDetails.id, text);
		}
	};

	return (
		<div className="chatContainer" ref={chatContainerRef}>
			<ul>
				{chatHistory.map((chat, index) =>
					chat.role === "user" ? (
						chat.parts[0]?.inline_data ? (
							<li key={index} className="userChat image">
								<img
									src={`data:${chat.parts[0].inline_data.mime_type};base64,${chat.parts[0].inline_data.data}`}
									alt="Uploaded Pet"
									style={{
										maxWidth: "200px",
										maxHeight: "200px",
										borderRadius: "10px",
										marginTop: "5px",
									}}
								/>
							</li>
						) : (
							<li key={index} className="userChat">
								{chat.parts[0]?.text}
							</li>
						)
					) : (
						<li key={index} className="modelChat">
							<div className="profileAI">
								<img src={pawIcon} alt="AI" />
							</div>
							<div className="chatAI">
								<div className="chat">
									<ReactMarkdown>{chat.parts[0].text}</ReactMarkdown>
								</div>
								<div className="chatMenu">
									<FiVolume2
										onClick={() => textTospeech(chat.parts[0].text)}
										onDoubleClick={() => stopSpeaking()}
									/>
									<FiCopy onClick={() => copyText(chat.parts[0].text)} />
									<FiRefreshCcw onClick={() => regenerateChat(index)} />
									{petDetails && (
										<FiSave
											onClick={() => handleSaveChat(chat.parts[0].text)}
										/>
									)}
								</div>
							</div>
						</li>
					)
				)}

				{isThinking && (
					<li className="modelChat" style={{ display: "flex" }}>
						<div className="profileAI">
							<img src={pawIcon} alt="AI" />
						</div>
						<div className="bouncingDots">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};

export default MainChat;
