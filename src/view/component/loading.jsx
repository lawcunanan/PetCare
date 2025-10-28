import React from "react";

export function LoadingSpinner({ loading }) {
	if (!loading) return null;

	const spinnerStyle = {
		height: "20px",
		width: "20px",
		color: "white",
		animation: "spin 1s linear infinite",
		marginTop: "2px",
	};

	const circleStyle = {
		opacity: 0.25,
	};

	const pathStyle = {
		opacity: 0.75,
		fill: "currentColor",
	};

	if (
		typeof document !== "undefined" &&
		!document.getElementById("spinner-keyframes")
	) {
		const style = document.createElement("style");
		style.id = "spinner-keyframes";
		style.innerHTML = `
			@keyframes spin {
				from { transform: rotate(0deg); }
				to { transform: rotate(360deg); }
			}
		`;
		document.head.appendChild(style);
	}

	return (
		<svg
			style={spinnerStyle}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				style={circleStyle}
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path style={pathStyle} d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
		</svg>
	);
}
