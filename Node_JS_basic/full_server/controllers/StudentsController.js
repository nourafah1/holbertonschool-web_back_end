import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    const database = process.argv[2];

    readDatabase(database)
      .then((students) => {
        let message = 'This is the list of our students';

        const fields = Object.keys(students).sort((a, b) => (
          a.toLowerCase().localeCompare(b.toLowerCase())
        ));

        fields.forEach((field) => {
          message += `\nNumber of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`;
        });

        response.status(200).send(message);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const database = process.argv[2];
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(database)
      .then((students) => {
        response.status(200).send(`List: ${students[major].join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}
