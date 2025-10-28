import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function updatePet(petId, petData, chatHistory, setLoading) {
	setLoading(true);
	try {
		const petRef = doc(db, "pets", petId);

		const updatedData = {
			...petData,
			chatHistory: chatHistory || [],
		};

		await updateDoc(petRef, updatedData);

		setLoading(false);
		alert("Successfully saved!");
		return true;
	} catch (error) {
		console.error("Error updating pet:", error);
		setLoading(false);
		return false;
	}
}

export default updatePet;
