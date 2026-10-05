const fs = require('fs');
const path = 'c:\\Users\\fenil\\Downloads\\website portfolio\\portfolio-void\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  // Editing & Post
  '"Premiere Pro"': '"Adobe Premiere Pro"',
  '"After Effects"': '"Motion Graphics & VFX"',
  '"DaVinci Resolve"': '"Color Grading & Resolve"',
  '"CapCut PC"': '"Fast-Turn Editing (CapCut)"',
  '"Audacity"': '"Podcast & Audio Editing"',
  '"Audition"': '"Pro Audio Mixing"',
  
  // Design & Visual
  '"Photoshop"': '"Photo Manipulation & Retouching"',
  '"Illustrator"': '"Vector Design & Branding"',
  '"Lightroom"': '"Photo Colour Correction"', // Shortened slightly
  '"Canva"': '"Rapid Visual Content Creation"',
  '"Figma"': '"UI/UX Prototyping"',

  // 3D & Motion
  '"Blender"': '"3D Animation & Scene Composition"',
  '"Fusion 360"': '"3D Product Design"',
  '"AutoCAD"': '"Technical CAD Drafting"',

  // Camera & Hardware
  '"Sony A6700"': '"Mirrorless Cinema Camera"',
  '"TTArtisan f/1.8"': '"Manual Prime Lens Operation"',
  '"16-50mm f/3.5-5.6"': '"Versatile Zoom Lens Operation"',
  '"Sony Imaging Edge"': '"Remote Shooting & Tethering"',
  '"Gimbal Operation"': '"Stabilised Cinematic Movement"',
  '"Tripod"': '"Controlled Static & Long Exposure"',
  '"Simpex 200W"': '"Studio Lighting Setup"',

  // Social & Strategy
  '"Content Strategy"': '"Platform Growth Strategy"',
  '"YouTube Growth"': '"YouTube Channel Management"',
  '"Campaign Mgmt"': '"Social Media Campaigns"',
  '"Analytics"': '"Performance Analytics & Reporting"',
  '"Reels / Shorts"': '"Short-Form Video Production"',
  '"Thumbnail Design"': '"Click-Through Optimisation"',
  '"SEO / Tags"': '"YouTube SEO & Discoverability"',
  '"Community Building"': '"Audience & Community Growth"',

  // Code & Dev
  '"VS Code"': '"VS Code — Web Development"',
  '"Google Colab"': '"Python Notebooks & ML"', // Shortened
  '"Python"': '"Python Scripting & Automation"',
  '"HTML / CSS"': '"Frontend Web Development"',

  // AI & Web
  '"Antigravity"': '"Agentic AI Development"', // A bit cooler than "No-Code" ;)
  '"Claude"': '"AI-Assisted Workflows"',
  '"Gemini"': '"AI Research & Ideation"',
  '"Topaz AI"': '"AI-Powered Upscaling"',
};

for (const [oldStr, newStr] of Object.entries(replacements)) {
  // Be careful to only replace names inside the tools array.
  // The structure is usually `name: "Old"` -> `name: "New"`
  const exactOld = `name: ${oldStr}`;
  const exactNew = `name: ${newStr}`;
  content = content.replace(exactOld, exactNew);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Skill names updated!');
