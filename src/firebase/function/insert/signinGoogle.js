import { auth, db } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const signinGoogle = async (setBtnloading) => {
	setBtnloading(true);
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		const user = result.user;

		// Check if user doc exists in Firestore
		const userDocRef = doc(db, "users", user.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (!userDocSnap.exists()) {
			// Create user doc if not exists
			await setDoc(userDocRef, {
				name: user.displayName || "No Name",
				email: user.email,
				profileImageUrl: user.photoURL || "",
				createdAt: serverTimestamp(),
			});
		}

		alert(`Welcome back, ${user.displayName || user.email}!`);
			window.location.href = "/auth/chat";
	} catch (error) {
		alert(error.message);
	} finally {
		setBtnloading(false);
	}
};
