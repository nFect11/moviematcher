module.exports = {
  mode: "jit",
  purge: ["./src/**/*.js", "./src/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "300px": "300px",
      },
      height: {
        "450px": "450px",
        "1000px": "1000px",
      },
      maxHeight: {
        192: "48rem",
      },
      minHeight: {
        192: "48rem",
        "1/2": "50%",
      },
      minWidth: {
        192: "48rem",
        "1/2": "50%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
