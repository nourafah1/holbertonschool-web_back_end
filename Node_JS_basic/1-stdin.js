process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', (input) => {
  process.stdout.write(`Your name is: ${input}`);
});

process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
