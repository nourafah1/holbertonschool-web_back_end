import fs from 'fs';

export default function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const lines = data
        .split('\n')
        .slice(1)
        .filter((line) => line.trim() !== '');

      const students = {};

      lines.forEach((line) => {
        const student = line.split(',');
        const firstName = student[0];
        const field = student[3].trim();

        if (!students[field]) {
          students[field] = [];
        }

        students[field].push(firstName);
      });

      resolve(students);
    });
  });
}
