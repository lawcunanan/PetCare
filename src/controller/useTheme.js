import { useState, useEffect } from "react";

export default function useTheme() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		document.documentElement.setAttribute("data-theme", savedTheme);
		setTheme(savedTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", newTheme);
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return { theme, toggleTheme };
}
