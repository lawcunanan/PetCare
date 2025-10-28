import useTheme from "../../controller/useTheme";
import {
	FiSun,
	FiMoon,
	FiTrash2,
	FiUser,
	FiHelpCircle,
	FiLogOut,
} from "react-icons/fi";
import { useChat } from "../../context/chatContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const SideMenu = () => {
	const { theme, toggleTheme } = useTheme();
	const { setChat } = useChat();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			alert("You have been signed out.");
			window.location.href = "/";
		} catch (error) {
			console.error("Sign-out error:", error);
			alert("Failed to sign out. Please try again.");
		}
	};

	return (
		<div className="sidebarMenu">
			<ul className="menuContainer">
				<li onClick={toggleTheme}>
					{theme === "dark" ? <FiSun /> : <FiMoon />} Switch to{" "}
					{theme === "dark" ? "Light" : "Dark"} Mode
				</li>
				<li onClick={() => setChat([])}>
					<FiTrash2 /> Clear conversations
				</li>
				<li>
					<FiUser /> My Account
				</li>
				<li>
					<FiHelpCircle /> Updates & FAQ
				</li>
				<li onClick={handleLogout}>
					<FiLogOut /> Log out
				</li>
			</ul>
		</div>
	);
};

export default SideMenu;
