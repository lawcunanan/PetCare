export const textTospeech = (text) => {
	const speechSynthesis = window.speechSynthesis;

	if (!speechSynthesis) {
		alert("Text to speech is not supported in this browser.");
		return;
	}

	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = "en-US";
	utterance.pitch = 1;
	utterance.rate = 1;

	speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
	speechSynthesis.cancel();
};
