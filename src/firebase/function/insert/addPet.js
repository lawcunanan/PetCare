import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function addPet(uid, petData, setBtnLoading) {
	try {
		setBtnLoading(true);

		const userRef = doc(db, "users", uid);

		const petDataWithChat = {
			owner: userRef,
			...petData,
			chatHistory: [],
		};

		const docRef = await addDoc(collection(db, "pets"), petDataWithChat);
		alert("Registered pet successfully!");
	} catch (error) {
		console.error("Error adding pet: ", error);
		alert("Failed to register pet.");
	} finally {
		setBtnLoading(false);
	}
}
