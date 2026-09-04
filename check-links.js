const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    let dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.git') && !dirFile.includes('dist') && !dirFile.includes('.angular')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (['.html', '.ts', '.js', '.css', '.md'].includes(path.extname(dirFile))) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
}

const files = walkSync(__dirname);
const urlRegex = /(https?:\/\/[^\s"'`<>()]+)/g;

let links = new Set();
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    let url = match[1];
    if(url.endsWith('.')) url = url.slice(0, -1);
    if(url.endsWith(',')) url = url.slice(0, -1);
    links.add(url);
  }
});

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: {"User-Agent": "Mozilla/5.0"} }, (res) => {
      // Ignore 403 as many sites block basic node user-agents
      if (res.statusCode >= 400 && res.statusCode !== 403) {
        resolve({url, status: res.statusCode, ok: false});
      } else {
        resolve({url, status: res.statusCode, ok: true});
      }
    }).on('error', (e) => {
      resolve({url, error: e.message, ok: false});
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({url, error: 'TIMEOUT', ok: false});
    });
    req.end();
  });
}

async function run() {
  const arr = Array.from(links);
  const broken = [];
  
  for (let i = 0; i < arr.length; i += 10) {
    const batch = arr.slice(i, i + 10);
    const results = await Promise.all(batch.map(checkUrl));
    results.filter(r => !r.ok).forEach(r => broken.push(r));
  }
  
  fs.writeFileSync('broken-links.json', JSON.stringify(broken, null, 2), 'utf8');
}

run();
