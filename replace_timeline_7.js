const fs = require('fs');

try {
  let content = fs.readFileSync('app/page.tsx', 'utf8');
  let newTimeline = fs.readFileSync('new_timeline_7.txt', 'utf8');

  const startMarker = '<div className="timeline">';
  const endMarker = '</div>\n      </section>';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker, startIndex);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find timeline bounds");
    process.exit(1);
  }
  
  // Replace in original file
  const newContent = content.substring(0, startIndex) + newTimeline + '\n      </section>' + content.substring(endIndex + endMarker.length);
  
  fs.writeFileSync('app/page.tsx', newContent);
  console.log("Successfully replaced timeline with 7 chapters.");
} catch (e) {
  console.error("Error:", e);
}
