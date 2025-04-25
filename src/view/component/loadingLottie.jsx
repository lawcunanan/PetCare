import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

const LoadingLottie = () => {
	return (
		<div>
			<Lottie animationData={loadingAnimation} loop={true} />
		</div>
	);
};

export default LoadingLottie;
