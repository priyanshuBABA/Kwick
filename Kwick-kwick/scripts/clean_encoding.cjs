const fs = require('fs');

const filesToClean = [
  'c:/Users/priya/OneDrive/Desktop/xyz/src/customer/HouseholdItems.jsx',
  'c:/Users/priya/OneDrive/Desktop/xyz/src/data/mockData.js'
];

filesToClean.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath);
  
  // Check for BOM (ef bb bf)
  if (content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) {
    console.log(`Detected BOM in ${filePath}, stripping it...`);
    content = content.slice(3);
  }
  
  // Also normalize any garbled text if it looks like UTF-8 was double-encoded
  // But for now, just stripping the BOM might fix everything.
  
  // Re-save as pure UTF-8 string
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned up ${filePath}`);
});
