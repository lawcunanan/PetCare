import {
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export async function signupUser(
	{ name, email, password, profileImageUrl },
	setBtnLoading
) {
	try {
		setBtnLoading(true);

		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		await updateProfile(user, {
			displayName: name,
			photoURL: profileImageUrl,
		});

		await sendEmailVerification(user);

		await setDoc(doc(db, "users", user.uid), {
			name,
			email,
			profileImageUrl,
			createdAt: serverTimestamp(),
		});

		alert(
			"Account created successfully! Please check your email for verification."
		);
	} catch (error) {
		console.error("Signup error:", error);
		alert("Signup failed: " + error.message);
	} finally {
		setBtnLoading(false);
	}
}
