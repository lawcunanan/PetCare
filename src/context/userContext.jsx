import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import authAnimation from "../assets/loading.json";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [userDetails, setUserDetails] = useState(null);

	const isAuth = location.pathname.startsWith("/auth");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				try {
					const userRef = doc(db, "users", currentUser.uid);
					const docSnap = await getDoc(userRef);

					if (docSnap.exists()) {
						setUserDetails({
							uid: currentUser.uid,
							...docSnap.data(),
						});
						if (!isAuth && location.pathname != "/signin") {
							navigate("/auth/chat");
						}
					} else {
						alert("No user record found in the database.");
						setUserDetails({});
					}
				} catch (error) {
					setUserDetails({});
					alert("An error occurred. Please try again.");
				}
			} else {
				setUser(null);
				setUserDetails(null);
				if (isAuth) {
					navigate("/");
				}
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [navigate, location.pathname]);

	return (
		<UserContext.Provider value={{ user, userDetails, loading }}>
			{loading ? (
				<div className="authloading-container">
					<Lottie animationData={authAnimation} loop={true} className="auth" />
				</div>
			) : (
				children
			)}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
