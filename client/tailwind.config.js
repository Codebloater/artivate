/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#0E0049",
        "primary-violet": "#714DFF",
        "text-light-grey": "#A7A4A4",
        "custom-green": {
          dark: "#297157",
          light: "#A1EAA3",
        },
        "card-colors": {
          lightblue: "#94E6FF",
          lightyellow: "#FFD979",
          lightorange: "#FDA25F",
          lightpink: "#F5A1DE",
        },
      },
      backgroundImage: {
        "bg-logo": "url('./src/assets/Logo.svg')",
      },
      fontFamily: {
        ptSans: ["PT Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
