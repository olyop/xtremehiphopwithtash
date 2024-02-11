/** @type {import('tailwindcss').Config} */

module.exports = {
	important: false,
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		fontFamily: {
			"sans": ["La Nord", "sans-serif"],
			"mono": ["monospace"],
		},
		extend: {
			colors: {
				primary: "#ff0000",
				"primary-light": "#ff4040",
				"primary-dark": "#bf0000",
				"apple-store-get-blue": "#3478f5",
			},
			height: {
				"header-height": "5rem",
				"content-height": "calc(100vh - 5rem)",
			},
			width: {
				"booking-modal": "30rem",
			},
			screens: {
				"tiny": "350px",
			},
		},
	},
	plugins: [],
};
