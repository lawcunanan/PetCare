import React from "react";
import { FiMenu } from "react-icons/fi";
import { useUser } from "../../context/userContext";

import profileicon from "../../assets/profileicon.jpg";

const Header = () => {
	const { userDetails } = useUser();

	return (
		<header className="header">
			<FiMenu className="toggleSidebarIcon" />

			<div className="profileContainer">
				<img
					src={userDetails?.profileImageUrl || profileicon}
					alt="Profile"
					onError={(e) => {
					e.target.onerror = null;
					e.target.src = profileicon;
					}}
					/>
				<span>
					<h5>{userDetails?.name || "Unknown User"}</h5>
					<p>{userDetails?.email || "No email"}</p>
				</span>
			</div>
		</header>
	);
};

export default Header;
