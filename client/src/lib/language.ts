import { Stats } from "./type";

type LanguageColor = {
  color: string;
};

export const languages: Record<string, LanguageColor> = {
  bat: { color: "#C1F12E" },
  bibtex: { color: "#778899" },
  c: { color: "#555555" },
  csharp: { color: "#178600" },
  cpp: { color: "#f34b7d" },
  clojure: { color: "#db5855" },
  cmake: { color: "#DA3434" },
  coffeescript: { color: "#244776" },
  dockercompose: { color: "#1D63ED" },
  css: { color: "#663399" },
  "cuda-cpp": { color: "#3A4E3A" },
  dart: { color: "#00B4AB" },
  dockerbake: { color: "#1D63ED" },
  dockerfile: { color: "#1D63ED" },
  docker: { color: "#1D63ED" },
  env: { color: "#e5d559" },
  fsharp: { color: "#b845fc" },
  fortran: { color: "#4d41b1" },
  "fortran-modern": { color: "#4d41b1" },
  "git-commit": { color: "#F44D27" },
  "git-rebase": { color: "#F44D27" },
  git: { color: "#F44D27" },
  go: { color: "#00ADD8" },
  graphql: { color: "#e10098" },
  groovy: { color: "#4298b8" },
  handlebars: { color: "#f7931e" },
  hlsl: { color: "#aace60" },
  html: { color: "#e34c26" },
  ignore: { color: "#F44D27" },
  ini: { color: "#d1dbe0" },
  java: { color: "#b07219" },
  javascript: { color: "#f1e05a" },
  javascriptreact: { color: "#f1e05a" },
  json: { color: "#292929" },
  jsonl: { color: "#292929" },
  jsonc: { color: "#292929" },
  julia: { color: "#a270ba" },
  juliamarkdown: { color: "#a270ba" },
  latex: { color: "#5170e8" },
  less: { color: "#1d365d" },
  lua: { color: "#000080" },
  makefile: { color: "#427819" },
  markdown: { color: "#083fa1" },
  mdx: { color: "#F8B32C" },
  sql: { color: "#e38c00" },
  "objective-c": { color: "#438eff" },
  "objective-cpp": { color: "#6866fb" },
  perl: { color: "#0298c3" },
  php: { color: "#4F5D95" },
  plaintext: { color: "#28292b" },
  postcss: { color: "#dc3a0c" },
  powershell: { color: "#012456" },
  prisma: { color: "#0c344b" },
  properties: { color: "#b5b5b5" },
  jade: { color: "#a86454" },
  python: { color: "#3572A5" },
  r: { color: "#276DC3" },
  raku: { color: "#0000fb" },
  razor: { color: "#512be4" },
  restructuredtext: { color: "#141414" },
  ruby: { color: "#701516" },
  rust: { color: "#dea584" },
  scss: { color: "#c6538c" },
  shaderlab: { color: "#222c37" },
  shellscript: { color: "#eb864b" },
  swift: { color: "#F05138" },
  tailwindcss: { color: "#38bdf8" },
  terraform: { color: "#7b42bb" },
  tex: { color: "#3D6117" },
  typescript: { color: "#3178c6" },
  typescriptreact: { color: "#3178c6" },
  vb: { color: "#945db7" },
  vue: { color: "#41b883" },
  wat: { color: "#6548a3" },
  xml: { color: "#0060ac" },
  xsl: { color: "#9c3eaf" },
  yaml: { color: "#cb171e" },
};

export const getContrastTextColor = (hexColor: string): string => {
  hexColor = hexColor.replace("#", "");

  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export const getLanguageType = (language: string) => {
  switch (language) {
    case "dockercompose":
    case "dockerbake":
    case "dockerfile":
      return "docker";
    case "fortran-modern":
      return "fortran";
    case "git-commit":
    case "git-rebase":
    case "ignore":
      return "git";
    case "javascriptreact":
      return "jsx";
    case "typescriptreact":
      return "tsx";
    case "jade":
      return "pug";
    case "plaintext":
      return "txt";
    case "jsonl":
    case "jsonc":
      return "json";
    default:
      return language;
  }
};

export const validLanguage = (language: string) => {
  switch (language) {
    case "C++":
      return "Cpp";
    default:
      return language;
  }
};

export const getRankInfo = (rank: string): { name: string; color: string } => {
  const rankMap: { [key: string]: { name: string; color: string } } = {
    newbie: { name: "NB", color: "#808080" }, // Gray
    pupil: { name: "PU", color: "#008000" }, // Green
    specialist: { name: "SP", color: "#03A89E" }, // Cyan
    expert: { name: "EX", color: "#0000FF" }, // Blue
    "candidate master": { name: "CM", color: "#AA00AA" }, // Violet
    master: { name: "M", color: "#FF8C00" }, // Orange
    "international master": { name: "IM", color: "#FF8C00" }, // Orange
    grandmaster: { name: "GM", color: "#FF0000" }, // Red
    "international grandmaster": { name: "IGM", color: "#FF0000" }, // Red
    "legendary grandmaster": { name: "LGM", color: "#FF3333" }, // Bright Red
  };

  return rankMap[rank.toLowerCase()] || { name: "??", color: "#000000" };
};

export const msToHM = (ms: number): string => {
  if (ms === 0) return "0M";

  const totalMinutes = Math.ceil(ms / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (totalMinutes <= 1) return "1M";
  if (hours === 0) return `${totalMinutes}M`;
  if (minutes === 0) return `${hours}H`;
  return `${hours}H ${minutes}M`;
};

export const countLanguages = (stats: Stats): number => {
  return Object.keys(stats).filter((key) => key !== "total").length;
};
