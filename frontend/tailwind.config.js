/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Safelist react-pdf classes to prevent them from being purged
    'react-pdf__Page',
    'react-pdf__Page__textContent',
    'react-pdf__Page__annotations',
    'react-pdf__Page__textLayer',
    'react-pdf__Page__annotationLayer',
    'react-pdf__Page__canvas',
    'react-pdf__Page__svg',
    // Add more classes if necessary
  ],
}
