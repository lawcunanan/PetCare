import React from "react";

import PetLottie from "./petLottie";

const MainWelcome = () => {
	return (
		<div className="welcomeContainer">
			<div className="lottieContainer">
				<PetLottie />
			</div>
			<h1 className="mainTitle">Elevate Your Pet Care Experience with AI</h1>
			<div className="faqsSection">
				<p>Frequently Asked Questions</p>
				<ul className="faqsList">
					<li>How often should I bathe my dog?</li>
					<li>Can cats eat human food?</li>
					<li>What vaccines do puppies need?</li>
					<li>How do I stop my pet from scratching?</li>
					<li>Is it safe to walk pets in hot weather?</li>
				</ul>
			</div>
		</div>
	);
};

export default MainWelcome;
