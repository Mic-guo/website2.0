const fs = require("fs");
const path = require("path");

// Read the file
const filePath = path.join(__dirname, "src/House/houseScene.jsx");
let content = fs.readFileSync(filePath, "utf8");

// Define an array of colors to use
const colors = [
  "#8B4513", // Brown
  "#A0522D", // Sienna
  "#D2B48C", // Tan
  "#4682B4", // SteelBlue
  "#5F9EA0", // CadetBlue
  "#6495ED", // CornflowerBlue
  "#708090", // SlateGray
  "#778899", // LightSlateGray
  "#808080", // Gray
  "#A9A9A9", // DarkGray
  "#B8860B", // DarkGoldenRod
  "#BDB76B", // DarkKhaki
  "#CD853F", // Peru
  "#D2691E", // Chocolate
  "#DAA520", // GoldenRod
  "#E6E6FA", // Lavender
  "#F0E68C", // Khaki
  "#F5DEB3", // Wheat
  "#F5F5DC", // Beige
  "#F8F8FF", // GhostWhite
  "#FA8072", // Salmon
  "#FAFAD2", // LightGoldenRodYellow
  "#FFDEAD", // NavajoWhite
  "#606060", // Dark Gray
  "#4B0082", // Indigo
  "#800080", // Purple
  "#9932CC", // DarkOrchid
];

// Create a function to get a random color with random metalness/roughness properties
function getRandomMaterial() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const hasMetalness = Math.random() > 0.5;
  const materialProps = hasMetalness
    ? `{ color: "${color}", metalness: ${(Math.random() * 0.7 + 0.2).toFixed(
        1
      )}, roughness: ${(Math.random() * 0.7 + 0.2).toFixed(1)} }`
    : `{ color: "${color}", roughness: ${(Math.random() * 0.6 + 0.4).toFixed(
        1
      )} }`;

  return `new THREE.MeshStandardMaterial(${materialProps})`;
}

// Regex to find and replace all instances of material={materials[""]}
const regex = /material=\{materials\[""\]\}/g;
let count = 0;

// Replace each occurrence with a new material
content = content.replace(regex, () => {
  count++;
  return `material={\n                        ${getRandomMaterial()}\n                      }`;
});

console.log(`Updated ${count} materials with random colors`);
fs.writeFileSync(filePath, content);
