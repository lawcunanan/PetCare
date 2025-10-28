import React from "react";
import { useState, useContext } from "react";
import PetLottie from "./petLottie";
//import callGemini from "../../controller/geminiAPI";

import { useChat } from "../../context/chatContext";
const MainWelcome = () => {
	const [faqs, setfaqs] = useState([
		"How often should I bathe my dog?",
		"Can cats eat human food?",
		"What vaccines do puppies need?",
		"How do I stop my pet from scratching?",
		"Is it safe to walk pets in hot weather?",
	]);

	const { addChat } = useChat();

	return (
		<div className="welcomeContainer">
			<div className="lottieContainer">
				<PetLottie />
			</div>
			<h1 className="mainTitle">Elevate Your Pet Care Experience with AI</h1>
			<div className="faqsSection">
				<p>Frequently Asked Questions</p>
				<ul className="faqsList">
					{faqs.map((item, index) => (
						<li key={index} onClick={() => addChat(item)}>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default MainWelcome;
