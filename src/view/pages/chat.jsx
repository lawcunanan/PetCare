import React, { useContext, useEffect, useState } from "react";
import SideRegister from "../component/sideRegister";
import SideMenu from "../component/SideMenu";
import Header from "../component/mainHeader";
import MainChat from "../component/MainChat";
import MainField from "../component/mainField";
import MainWelcome from "../component/MainWelcome";
import { useChat } from "../../context/chatContext";
const Chat = () => {
	const { chatHistory } = useChat();
	return (
		<>
			<section className="sidebar">
				<SideRegister />
				<SideMenu />
			</section>
			<section className="main">
				<Header />
				<main>
					{chatHistory.length < 1 ? <MainWelcome /> : <MainChat />}
					<MainField />
				</main>
			</section>
		</>
	);
};

export default Chat;
