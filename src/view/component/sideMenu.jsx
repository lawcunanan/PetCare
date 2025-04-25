import React, { useContext } from "react";
import useTheme from "../../controller/useTheme";
import {
	FiSun,
	FiMoon,
	FiTrash2,
	FiUser,
	FiHelpCircle,
	FiLogOut,
} from "react-icons/fi";
import MyContext from "../../controller/myContext";

const SideMenu = () => {
	const { theme, toggleTheme } = useTheme();
	const { updateChats } = useContext(MyContext);

	const clearChats = () => {
		updateChats([]); // ✅ Clears all chats
	};

	return (
		<div className="sidebarMenu">
			<ul className="menuContainer">
				<li onClick={toggleTheme}>
					{theme === "dark" ? <FiSun /> : <FiMoon />} Switch to{" "}
					{theme === "dark" ? "Light" : "Dark"} Mode
				</li>
				<li onClick={clearChats}>
					<FiTrash2 /> Clear conversations
				</li>
				<li>
					<FiUser /> My Account
				</li>
				<li>
					<FiHelpCircle /> Updates & FAQ
				</li>
				<li>
					<FiLogOut /> Log out
				</li>
			</ul>
		</div>
	);
};

export default SideMenu;
