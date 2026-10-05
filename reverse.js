const fs = require('fs');

try {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  // Find where timeline starts and ends
  const startMarker = '<div className="timeline">';
  const endMarker = '</section>';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker, startIndex);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find timeline bounds");
    process.exit(1);
  }
  
  const timelineContent = content.substring(startIndex + startMarker.length, endIndex);
  
  // Extract all 6 chapters using their comment markers
  const chapters = [];
  for (let i = 1; i <= 6; i++) {
    const currentMarker = `{/* Chapter 0${i} */}`;
    const nextMarker = i < 6 ? `{/* Chapter 0${i+1} */}` : `</div>\n      </section>`;
    
    let chStart = timelineContent.indexOf(currentMarker);
    if (chStart === -1) {
      console.error(`Could not find ${currentMarker}`);
      process.exit(1);
    }
    
    let chEnd = i < 6 ? timelineContent.indexOf(nextMarker) : timelineContent.lastIndexOf('</div>');
    
    if (chEnd === -1) {
      console.error(`Could not find end of chapter 0${i}`);
      process.exit(1);
    }
    
    chapters.push(timelineContent.substring(chStart, chEnd).trim());
  }
  
  // Reverse the array
  chapters.reverse();
  
  // Join them back
  const reversedContent = '\n          ' + chapters.join('\n\n          ') + '\n        </div>\n      ';
  
  // Replace in original file
  const newContent = content.substring(0, startIndex + startMarker.length) + reversedContent + content.substring(endIndex + endMarker.length);
  
  fs.writeFileSync('app/page.tsx', newContent);
  console.log("Successfully reversed timeline.");
} catch (e) {
  console.error("Error:", e);
}
