/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FF7F50"
      },
      fontFamily: {
        dela: ['"Dela Gothic One"', "sans-serif"],
        nanum: ['"Noto Sans KR"', "sans-serif"]
      }
    },
    fontFamily: {
      sans: ['"Nanum Gothic"', "sans-serif"]
    }
  },
  plugins: []
};
