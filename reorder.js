const fs = require('fs');

const path = 'c:\\Users\\fenil\\Downloads\\website portfolio\\portfolio-void\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// We want to reorder:
// 1. Freelance Work
// 2. Tools & Software
// 3. Photography Showcase
// 4. Fun Camera Moments
// 5. Education

const freelanceIdx = content.indexOf('      {/* Freelance Section */}');
const photoIdx = content.indexOf('      {/* Photography Showcase */}');
const funIdx = content.indexOf('      {/* Fun Camera Moments */}');
const skillsIdx = content.indexOf('      {/* Skills / Arsenal Section */}');
const eduIdx = content.indexOf('      {/* Education Section */}');

if (freelanceIdx === -1 || photoIdx === -1 || funIdx === -1 || skillsIdx === -1 || eduIdx === -1) {
    console.error('Could not find all sections');
    process.exit(1);
}

// Extract blocks
// Block 1: Before Photography (up to the divider before Photography)
// The divider before Photography is at:
const dividerBeforePhoto = content.lastIndexOf('      <div className="divider" data-label="///"></div>', photoIdx);

// Block: Freelance and before (0 to dividerBeforePhoto)
const beforePhoto = content.substring(0, dividerBeforePhoto);

// Photography Block (from dividerBeforePhoto to divider before Fun)
const dividerBeforeFun = content.lastIndexOf('      <div className="divider" data-label="///"></div>', funIdx);
const photoBlock = content.substring(dividerBeforePhoto, dividerBeforeFun);

// Fun Block (from dividerBeforeFun to divider before Skills)
const dividerBeforeSkills = content.lastIndexOf('      <div className="divider" data-label="///"></div>', skillsIdx);
const funBlock = content.substring(dividerBeforeFun, dividerBeforeSkills);

// Skills Block (from dividerBeforeSkills to divider before Edu)
const dividerBeforeEdu = content.lastIndexOf('      <div className="divider" data-label="///"></div>', eduIdx);
const skillsBlock = content.substring(dividerBeforeSkills, dividerBeforeEdu);

// End Block (from dividerBeforeEdu to end)
const endBlock = content.substring(dividerBeforeEdu);

// New Order: beforePhoto + skillsBlock + photoBlock + funBlock + endBlock
const newContent = beforePhoto + skillsBlock + photoBlock + funBlock + endBlock;

fs.writeFileSync(path, newContent, 'utf8');
console.log('Reordered successfully!');
