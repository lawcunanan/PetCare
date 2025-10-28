import React, { useState, useRef } from "react";
import { FiMic, FiImage, FiSend } from "react-icons/fi";
import { speechToText } from "../../controller/speechTotext";
import { useChat } from "../../context/chatContext";

const MainField = () => {
	const [userMessage, setUserMessage] = useState("");
	const [recognizer, setRecognizer] = useState(null);
	const [isUploading, setIsUploading] = useState(false);

	const { addChat } = useChat();
	const fileInputRef = useRef(null);

	const handleSendMessage = () => {
		if (userMessage.trim() !== "") {
			addChat(userMessage.trim());
			setUserMessage("");
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleMicClick = () => {
		if (recognizer) {
			recognizer.stop();
			setRecognizer(null);
		} else {
			const instance = speechToText(setUserMessage);
			setRecognizer(instance);
		}
	};

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setIsUploading(true);

		const toBase64 = (file) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});

		try {
			const base64Image = await toBase64(file);
			await addChat({
				image: base64Image,
				mimeType: file.type,
			});
		} catch (error) {
			console.error("Error reading file:", error);
			await addChat("Failed to upload image.");
		}

		setIsUploading(false);
		e.target.value = null;
	};

	return (
		<div className="fieldContainer">
			<div className="inputWrapper">
				<div className="iconLeftGroup">
					<FiMic
						className="icon"
						onClick={handleMicClick}
						style={{ color: recognizer ? "green" : "inherit" }}
						disabled={isUploading}
					/>
					<FiImage
						className="icon"
						onClick={handleImageClick}
						style={{ cursor: "pointer" }}
						disabled={isUploading}
					/>
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: "none" }}
						onChange={handleFileChange}
					/>
				</div>
				<input
					type="text"
					placeholder={
						isUploading ? "Uploading image..." : "Type your message..."
					}
					value={userMessage}
					onChange={(e) => setUserMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					disabled={isUploading}
				/>
				<FiSend
					className="icon sendIcon"
					onClick={handleSendMessage}
					style={{ cursor: isUploading ? "not-allowed" : "pointer" }}
					disabled={isUploading}
				/>
			</div>
		</div>
	);
};

export default MainField;
