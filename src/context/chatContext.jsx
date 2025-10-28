import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Lottie from "lottie-react";
import authAnimation from "../assets/loading.json";
import { useUser } from "../context/userContext";
import callGemini from "../controller/geminiAPI";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const { user, userDetails, loading: userLoading } = useUser();

	const [loading, setLoading] = useState(true);
	const [allPets, setAllPets] = useState([]);
	const [petDetails, setPetDetails] = useState(null);
	const [chatHistory, setChat] = useState([]);
	const [isThinking, setIsThinking] = useState(false);

	useEffect(() => {
		if (!user) {
			setAllPets([]);
			setLoading(false);
			return;
		}

		const userRef = doc(db, "users", user.uid);
		const q = query(collection(db, "pets"), where("owner", "==", userRef));

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const pets = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setAllPets(pets);
				setLoading(false);
			},
			(error) => {
				console.error("Failed to fetch pets:", error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, [user]);

	const setActivePetById = (petId) => {
		const foundPet = allPets.find((pet) => pet.id === petId);
		if (foundPet) {
			setPetDetails(foundPet);
			setChat([]);
		}
	};

	// addChat function update:
	const addChat = async (chat) => {
		let userMessage;

		if (typeof chat === "object" && chat.image && chat.mimeType) {
			const base64Data = chat.image.split(",")[1];
			userMessage = {
				role: "user",
				parts: [
					{
						inline_data: {
							mime_type: chat.mimeType,
							data: base64Data,
						},
					},
					{
						text: "Analyze this image and check if it contains a dog or a cat. If it does not (e.g., it's a rabbit, bird, human, or object), politely explain the limitation.",
					},
				],
			};
		} else {
			userMessage = {
				role: "user",
				parts: [{ text: chat }],
			};
		}

		const updatedChatHistory = [...chatHistory, userMessage];
		setChat(updatedChatHistory);

		const response = await callGemini(
			userDetails,
			petDetails,
			updatedChatHistory,
			setIsThinking
		);

		setChat((prev) => [...prev, response]);
	};

	const regenerateChat = async (index) => {
		setIsThinking(true);

		const trimmedChat = chatHistory.slice(0, index);

		setChat(trimmedChat);
		const response = await callGemini(
			userDetails,
			petDetails,
			trimmedChat,
			setIsThinking
		);
		setChat((prev) => [...prev, response]);
	};

	return (
		<ChatContext.Provider
			value={{
				allPets,
				petDetails,
				setPetDetails,
				setActivePetById,
				regenerateChat,
				addChat,
				chatHistory,
				isThinking,
				loading,
				setChat,
			}}
		>
			{userLoading || loading ? (
				<div className="authloading-container">
					<Lottie animationData={authAnimation} loop={true} className="auth" />
				</div>
			) : (
				children
			)}
		</ChatContext.Provider>
	);
};

export const useChat = () => useContext(ChatContext);
