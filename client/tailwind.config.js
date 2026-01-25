/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bộ màu chuẩn theo thiết kế
        "primary": "#2bee6c",
        "primary-dark": "#22bd56",
        "background-light": "#f6f8f6", // Màu nền xám nhạt
        "background-dark": "#102216",
        "surface-light": "#ffffff",   
        "surface-dark": "#1c2e24",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
    },
  },
  plugins: [],
}