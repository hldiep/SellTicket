/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1d2044",
        bar: "#1d2021",
        icon: "#181a1b"
      },
      keyframes: {
        button_hover: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
        fadeInOut: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '10%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' },
        }
      },
      animation: {
        buttonHover: "button_hover 1s ease-in-out infinite",
        'fade-in-out': 'fadeInOut 5s ease-in-out forwards'
      },
    }
  },
  plugins: [],
}

