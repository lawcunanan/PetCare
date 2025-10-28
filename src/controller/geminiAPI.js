import { systemGuide } from "./systemGuide";

const callGemini = async (
	userDetails,
	petDetails,
	chatHistory,
	setThinking
) => {
	const combinedChats = [
		systemGuide(userDetails, petDetails),
		...(chatHistory || []),
	];

	try {
		setThinking(true);

		const res = await fetch("/api/gemini", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contents: combinedChats,
			}),
		});

		const data = await res.json();
		const responseText =
			data?.candidates?.[0]?.content?.parts?.[0]?.text ||
			"⚠️ No response from Gemini.";

		setThinking(false);
		return {
			role: "model",
			parts: [{ text: responseText }],
		};
	} catch (err) {
		setThinking(false);
		return {
			role: "model",
			parts: [{ text: `Error:  ${err.message}` }],
		};
	}
};

export default callGemini;
