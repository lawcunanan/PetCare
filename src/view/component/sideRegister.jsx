import React, { useState } from "react";
import { FaPaw } from "react-icons/fa";
import RegisterPetModal from "../component/registerPetModal";
import { useChat } from "../../context/chatContext";

const SideRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modeModal, setModeModal] = useState("register");
	const { allPets, petDetails, setPetDetails, setChat, setActivePetById } =
		useChat();

	const handlePetClick = (pet) => {
		if (petDetails?.id === pet.id) {
			setPetDetails(null);
			setChat([]);
		} else {
			setActivePetById(pet.id);
		}
	};

	return (
		<div className="sidebarRegister">
			<button
				className="btn-register"
				onClick={() => {
					setModeModal("register");
					setPetDetails(null); // Clear the selected pet details
					setShowModal(true);
				}}
			>
				➕ New Pet
			</button>

			<RegisterPetModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				mode={modeModal}
			/>

			<div>
				<h5 style={{ marginBottom: "10px" }}>My Furry & Feathered Friends</h5>
				<ul className="petContainer">
					{allPets.map((pet) => (
						<li
							key={pet.id}
							onClick={() => handlePetClick(pet)}
							onDoubleClick={() => {
								setPetDetails(pet); // Set the pet details for editing
								setModeModal("edit");
								setShowModal(true);
							}}
							className={petDetails?.id === pet.id ? "active" : ""}
						>
							<FaPaw />
							{pet.name || "Unnamed Pet"}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SideRegister;
