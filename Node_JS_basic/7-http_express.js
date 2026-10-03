const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  fs.readFile(database, 'utf8', (error, data) => {
    if (error) {
      res.type('text/plain');
      res.send('This is the list of our students\nCannot load the database');
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

    res.type('text/plain');
    res.send(response);
  });
});

app.listen(1245);

module.exports = app;
