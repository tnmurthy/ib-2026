const { execSync } = require('child_process');

try {
  const output = execSync('npx xlsx-cli "Innovat Bharat website Tracker Sheet.xlsx"').toString();
  const lines = output.split('\n');
  let dataLines = 0;
  for (const line of lines) {
    if (line.replace(/,/g, '').trim() !== '') {
      console.log(line);
      dataLines++;
    }
  }
  if (dataLines === 0) {
    console.log('No non-empty data found in the spreadsheet.');
  }
} catch (e) {
  console.log(e.toString());
}
