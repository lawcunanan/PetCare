import React, { useEffect, useRef, useContext } from "react";
import { FiVolume2, FiCopy, FiRefreshCcw } from "react-icons/fi";
import MyContext from "../../controller/myContext";
import pawIcon from "../../assets/paw.png";

const MainChat = () => {
	const { chats, thinking } = useContext(MyContext);
	const chatContainerRef = useRef(null);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chats]);

	return (
		<div className="chatContainer" ref={chatContainerRef}>
			<ul>
				{chats.map((chat, index) =>
					chat.role === "user" ? (
						<li key={index} className="userChat">
							{chat.parts[0].text}
						</li>
					) : (
						<li key={index} className="modelChat">
							<div className="profileAI">
								<img src={pawIcon} alt="AI" />
							</div>
							<div className="chatAI">
								<div className="chat">{chat.parts[0].text}</div>
								<div className="chatMenu">
									<FiVolume2 /> <FiCopy /> <FiRefreshCcw />
								</div>
							</div>
						</li>
					)
				)}
				{/* Thinking animation if true */}
				<li
					style={{ display: thinking ? "flex" : "none" }}
					className="modelChat"
				>
					<div className="profileAI">
						<img src={pawIcon} alt="AI" />
					</div>
					<div className="bouncingDots">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default MainChat;
