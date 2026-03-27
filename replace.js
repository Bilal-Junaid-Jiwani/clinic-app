const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.json')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

let replacedCount = 0;

files.forEach(file => {
    const original = fs.readFileSync(file, 'utf8');
    let content = original;
    
    // Replace names
    content = content.replace(/ClinicAI/g, 'Nexis');
    content = content.replace(/Clinic AI/g, 'Nexis');
    content = content.replace(/clinic-app/g, 'nexis-app');
    content = content.replace(/Clinic App/g, 'Nexis');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        replacedCount++;
        console.log(`Replaced in ${file}`);
    }
});

console.log(`Successfully rebranded ${replacedCount} files to Nexis Foundation.`);
