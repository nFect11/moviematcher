module.exports = {
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
        "8/10": "80%",
        "5vh": "5vh",
        "6vh": "6vh",
        "7vh": "7vh",
        "8vh": "8vh",
        "9vh": "9vh",
        "10vh": "10vh",
        "94vh": "94vh",
        "1/10": "10%",
      },
      maxHeight: {
        192: "48rem",
        "80vh": "80vh",
        "8/10": "80%",
      },
      minHeight: {
        192: "48rem",
        "1/2": "50%",
        "80vh": "80vh",
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
