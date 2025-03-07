export const extractCSS = (css: string) => {
  // get css inside {}
  const insideBracesMatch = css.match(/{([\s\S]*?)}/);
  if (!insideBracesMatch) return "";

  // skip the comment
  const insideBraces = insideBracesMatch[1];
  const cleanedCss = insideBraces.replace(/\/\*[\s\S]*?\*\//g, "");

  // get key & value
  const regex = /^\s*([\w-]+):\s*([^;]+);/gm;

  const matches = [...cleanedCss.matchAll(regex)];

  return matches
    .map((match) => `${match[1].trim()}:${match[2].trim()};`)
    .join("");
}
