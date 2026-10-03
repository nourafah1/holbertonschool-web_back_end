const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .slice(1)
        .filter((line) => line.trim() !== '');

      console.log(`Number of students: ${lines.length}`);

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

      Object.keys(fields).forEach((field) => {
        console.log(
          `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
        );
      });

      resolve();
    });
  });
}

module.exports = countStudents;
