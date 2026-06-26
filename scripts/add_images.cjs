const fs = require('fs');
const filesToUpdate = [
  'c:/Users/priya/OneDrive/Desktop/xyz/src/customer/HouseholdItems.jsx',
  'c:/Users/priya/OneDrive/Desktop/xyz/src/data/mockData.js'
];

filesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Very specific match for product objects
  // We use [^,]+ to match everything until the next comma for the name to handle single quotes internally
  const updatedContent = content.replace(/\{ id: '([^']+)', name: '([^']+)', (?!image:)/g, (match, id, name) => {
    // If name contains single quote, we must use double quotes for the whole name or escape it
    const cleanName = name.split('(')[0].split('/')[0].trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ',');
    const imageUrl = `https://loremflickr.com/400/400/${cleanName},fresh`;
    
    // We rewrite the name to use double quotes to handle any internal single quotes like L'Oreal
    return `{ id: '${id}', name: "${name}", image: "${imageUrl}", `;
  });
  
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated ${filePath}`);
});
