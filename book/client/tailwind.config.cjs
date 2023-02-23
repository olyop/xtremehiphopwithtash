/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#ef4444",
				"primary-light": "#f87171",
				"primary-dark": "#b91c1c",
			},
			height: {
				"header-height": "5rem",
				"content-height": "calc(100vh - 5rem)",
			},
		},
	},
	plugins: [],
};
