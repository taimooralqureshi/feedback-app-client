/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all your components and pages are included
    "./public/index.html",
  ],
  theme: {
    extend: {
      height: {
        'content-viewport': 'calc(100vh - 64px)',
      },
    },
  },
  plugins: [],
}

