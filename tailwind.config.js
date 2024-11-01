/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // override typography's "`", which is added before
            // & after inline code elements.
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
