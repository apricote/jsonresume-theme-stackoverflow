const { SafeString } = require("handlebars");

/**
 *
 * @param {string} text
 * @returns
 */
const paragraphSplit = (text) => {
  const expr = /\r\n|\r|\n/g;
  const lines = Array.isArray(text)
    ? text.join("").split(expr)
    : text.split(expr);
  const output = lines
    .reduce((combinedLines, line, index, array) => {
      previousLine =
        combinedLines.length > 0 ? combinedLines[combinedLines.length - 1] : "";

      if (line === "" || previousLine === "") {
        combinedLines.push(line);
      } else {
        combinedLines[combinedLines.length - 1] = `${previousLine} ${line}`;
      }

      return combinedLines;
    }, [])
    .reduce((a, b) => `${a}<p>${b}</p>`, "");

  return new SafeString(output);
};

module.exports = { paragraphSplit };
