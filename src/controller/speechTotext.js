export const speechToText = (setState) => {
	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;

	if (!SpeechRecognition) {
		alert("Speech recognition is not supported in this browser.");
		return;
	}

	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en-US";

	let finalTranscript = "";

	recognition.onresult = (event) => {
		let interimTranscript = "";

		for (let i = event.resultIndex; i < event.results.length; i++) {
			const transcript = event.results[i][0].transcript;
			if (event.results[i].isFinal) {
				finalTranscript += transcript + " ";
			} else {
				interimTranscript += transcript;
			}
		}

		setState(finalTranscript + interimTranscript);
	};

	recognition.onerror = (event) => {
		console.error("Speech recognition error:", event.error);
		recognition.stop();
	};

	recognition.start();

	return recognition;
};
