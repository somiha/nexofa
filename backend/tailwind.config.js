/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{ejs,js}"],
  theme: {
    extend: {
      colors: {
        "base-100": "#fff",
        "base-200": "#F6F6F6",
        "base-300": "#2E2C34",
        "base-400": "#84818A",
        "base-icon": "#84818A",
        icon: "#20C9AC",
      },
      boxShadow: {
        card: "20px 0px 80px 0px rgba(0, 0, 0, 0.50)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#347B98",
        },
      },
      "light",
    ],
  },
};
