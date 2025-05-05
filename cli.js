const readline = require('readline');
const { handlePunchIn, handlePunchOut } = require('./services/timeService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userId = 'user1'; // Hardcoded for testing

function prompt() {
  rl.question('Enter command (in/out/exit): ', async (cmd) => {
    if (cmd === 'exit') {
      rl.close();
      return;
    }
    
    let response;
    if (cmd === 'in') {
      response = await handlePunchIn(userId);
    } else if (cmd === 'out') {
      response = await handlePunchOut(userId);
    } else {
      response = 'Unknown command';
    }
    
    console.log(response);
    prompt();
  });
}

console.log('Time Tracking CLI\nCommands: in, out, exit');
prompt();