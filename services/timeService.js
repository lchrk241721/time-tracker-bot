const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/timeEntries.json');

//initialize Time File
initializeTimeFile();

function initializeTimeFile() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ entries: [] }));
    }
}

function getEntries() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading entries:', err);
        return [];
    }
}

function saveEntries(entries) {
    fs.writeFileSync(dataPath, JSON.stringify(entries, null, 2));
}

// Initialize data file if it doesn't exist
/*
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({ entries: [] }));
}

function getEntries() {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData).entries;
}

function saveEntries(entries) {
  fs.writeFileSync(dataPath, JSON.stringify({ entries }, null, 2));
}

*/

async function handlePunchIn(userId) {
  const entries = getEntries();
  const lastEntry = entries.filter(e => e.userId === userId).pop();
  
  if (lastEntry && !lastEntry.punchOut) {
    return "You're already punched in!";
  }
  
  const newEntry = {
    userId,
    punchIn: new Date().toISOString(),
    punchOut: null
  };
  
  entries.push(newEntry);
  saveEntries(entries);
  
  return `Punched in at ${new Date().toLocaleTimeString()}`;
}

async function handlePunchOut(userId) {
  const entries = getEntries();
  const lastEntry = entries.filter(e => e.userId === userId).pop();
  
  if (!lastEntry || lastEntry.punchOut) {
    return "You need to punch in first!";
  }
  
  lastEntry.punchOut = new Date().toISOString();
  saveEntries(entries);
  
  return `Punched out at ${new Date().toLocaleTimeString()}`;
}

module.exports = { handlePunchIn, handlePunchOut };