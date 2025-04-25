import React from "react";
import { FiMenu } from "react-icons/fi";

const Header = () => {
	return (
		<header className="header">
			<FiMenu className="toggleSidebarIcon" />
			<div className="profileContainer">
				<img
					src="https://www.bing.com/th/id/OIP.lXuMr3dxbAPT0ucLQIMafQHaF0?w=176&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
					alt="Profile"
				/>
			</div>
		</header>
	);
};

export default Header;
