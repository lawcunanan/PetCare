import React from "react";
import Lottie from "lottie-react";
import pawAnimation from "../../assets/paw.json";

const PetLottie = () => {
	return (
		<div>
			<Lottie animationData={pawAnimation} loop={true} />
		</div>
	);
};

export default PetLottie;
