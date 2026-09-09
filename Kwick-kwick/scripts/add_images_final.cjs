const fs = require('fs');

const filesToUpdate = [
  'c:/Users/priya/OneDrive/Desktop/xyz/src/customer/HouseholdItems.jsx',
  'c:/Users/priya/OneDrive/Desktop/xyz/src/data/mockData.js'
];

filesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let lines = fs.readFileSync(filePath, 'utf8').split('\n');
  
  let updatedLines = lines.map(line => {
    // If it's a product line and doesn't have image:
    if (line.includes('id:') && line.includes('name:') && !line.includes('image:')) {
      // Find name between single quotes, possibly escaped like Kellogg\'s
      const match = line.match(/name: '((?:\\'|[^'])+)'/);
      if (match) {
        const originalName = match[1];
        const cleanNameForImage = originalName.split('(')[0].split('/')[0].replace(/\\'/g, "").trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ',');
        const imageUrl = `https://loremflickr.com/400/400/${cleanNameForImage},fresh`;
        
        // Replace name: '...' with name: "...", image: "..."
        // Use double quotes for both to handle single quotes correctly
        const newName = originalName.replace(/\\'/g, "'");
        return line.replace(`name: '${originalName}'`, `name: "${newName}", image: "${imageUrl}"`);
      }
    }
    return line;
  });
  
  fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
  console.log(`Successfully updated ${filePath}`);
});
