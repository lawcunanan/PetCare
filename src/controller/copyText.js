export const copyText = (text) => {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			alert("Text copied to clipboard!");
		})
		.catch((err) => {
			alert("Failed to copy text!");
		});
};
