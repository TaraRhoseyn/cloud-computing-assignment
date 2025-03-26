module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
      // Tell Jest to handle axios as code rather than ignoring it
      "/node_modules/(?!axios)/"
    ]
  };