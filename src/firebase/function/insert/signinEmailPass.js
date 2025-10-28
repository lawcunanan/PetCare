import {
	signInWithEmailAndPassword,
	sendEmailVerification,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function signEmailPass(email, password, setBtnloading) {
	try {
		setBtnloading(true);

		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		if (!user.emailVerified) {
			await sendEmailVerification(user);
			await signOut(auth);
			setBtnloading(false);
			alert(
				"Email not verified! A verification email has been sent. Please check your inbox."
			);
			throw new Error("Email not verified");
		}

		setBtnloading(false);
		alert("Successfully signed in!");
		window.location.href = "/auth/chat";
		return user;
	} catch (error) {
		setBtnloading(false);
		throw error;
	}
}
