const fs = require('fs');

const path = 'c:\\Users\\fenil\\Downloads\\website portfolio\\portfolio-void\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldClass = 'className="mt-4 text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--off-white)] transition-colors flex items-center gap-2"';
const newClass = 'className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto"';

// Also check if there's any variation without gap-2
const oldClass2 = 'className="mt-4 text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--off-white)] transition-colors"';

content = content.split(oldClass).join(newClass);
content = content.split(oldClass2).join(newClass);

fs.writeFileSync(path, content, 'utf8');
console.log('Read More buttons updated.');
