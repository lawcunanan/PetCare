import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const updateChatHistory = async (petId, chatText) => {
	try {
		const chat = {
			role: "model",
			parts: [{ text: chatText }],
		};

		const petRef = doc(db, "pets", petId);

		await updateDoc(petRef, {
			chatHistory: arrayUnion(chat),
		});
		alert("Successfully saved!");
	} catch (error) {
		alert(error.message);
	}
};
