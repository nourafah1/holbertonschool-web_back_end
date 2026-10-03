const http = require('http');
const fs = require('fs');

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    fs.readFile(database, 'utf8', (error, data) => {
      if (error) {
        res.end('This is the list of our students\nCannot load the database');
        return;
      }

      const lines = data
        .split('\n')
        .slice(1)
        .filter((line) => line.trim() !== '');

      const fields = {};

      lines.forEach((line) => {
        const student = line.split(',');
        const firstName = student[0];
        const field = student[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstName);
      });

      let response = 'This is the list of our students\n';
      response += `Number of students: ${lines.length}`;

      Object.keys(fields).forEach((field) => {
        response += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      });

      res.end(response);
    });
  } else {
    res.end();
  }
});

app.listen(1245);

module.exports = app;
