import axios from "axios";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	if (!process.env.API_KEY) {
		console.error("API_KEY not set");
		return res.status(500).json({ error: "API_KEY not set in environment" });
	}

	try {
		const response = await axios.post(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
			req.body
		);

		return res.status(200).json(response.data);
	} catch (err) {
		console.error("Gemini API error:", err.response?.data || err.message);
		return res.status(500).json({ error: err.response?.data || err.message });
	}
}
