/** @type {import('postcss-load-config').Config} */
// Configurazione PostCSS per processare i file CSS
// - tailwindcss: processa le direttive @tailwind e genera le classi utility
// - autoprefixer: aggiunge automaticamente i prefissi vendor per la compatibilità cross-browser
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
