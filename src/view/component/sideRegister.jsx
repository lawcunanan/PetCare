import React from "react";
import { FaPaw } from "react-icons/fa";

const SideRegister = () => {
	return (
		<div className="sidebarRegister">
			<button>➕ New Companion</button>
			<div>
				<h5 style={{ marginBottom: "10px" }}>My Furry & Feathered Friends</h5>
				<ul className="petContainer">
					<li>
						<FaPaw /> Golden Retriever
					</li>
					<li>
						<FaPaw /> Siamese Cat
					</li>
					<li>
						<FaPaw /> Hamster
					</li>
					<li>
						<FaPaw /> Red-Eared Slider Turtle
					</li>
					<li>
						<FaPaw /> Budgerigar (Budgie Parrot)
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideRegister;
