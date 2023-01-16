/** @type {import('tailwindcss').Config} */
const {
  variants,
} = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ['./src/**/*.svelte'], 
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      
    },
  },
  variants: {
    ...variants,
    extend: {
     ringColor: ['hover'],
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
