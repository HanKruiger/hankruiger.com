/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/**/*.html'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['fantasy'],
        }
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['forest'],
          'base-300': 'rgb(40, 38, 38)',
          "--rounded-btn": "0.5rem",
        },
      }
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
