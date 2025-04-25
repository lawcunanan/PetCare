import React, { createContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
	const [chats, setChats] = useState([]);
	const [thinking, setThinking] = useState(false);

	const addChat = (chat) => {
		setChats((prevChats) => [...prevChats, chat]);
	};

	const updateChats = (newChats) => {
		setChats(newChats);
	};

	return (
		<MyContext.Provider
			value={{ chats, setChats, addChat, updateChats, thinking, setThinking }}
		>
			{children}
		</MyContext.Provider>
	);
};

export default MyContext;
