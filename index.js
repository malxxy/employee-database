const inquirer = require('./node_modules/inquirer'); // require inquirer
const mysql = require('./node_modules/mysql2'); // require sql
const express = require('./node_modules/express'); // require express

const PORT = process.env.PORT || 3001; // local host
const app = express(); // launch express app

app.use(express.urlencoded({ extended: false })); // middleware
app.use(express.json()); // middleware

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "codecode123",
  database: "employees.db"
});

// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//     console.log(results);
//     // count number of favorite books that are in stock and list IDs
//     // count id from total count and group by favorite books in stock
//     // querying database using count method and group by IN STOCK
//   });
  
//   db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//     console.log(results);
//     // sum quantity of favorite books in sections
//     // list max, min, and average
//   });
  
//   app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });


// Array of questions for user input
const questions = [
  {
    type: 'list',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role','quit'],
    message: 'What would you like to do?',
    name: 'choices',
  }
]

const addDepartment = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDepart',
    }
]

departmentAdd => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var addARow = `INSERT INTO department (id,name) VALUES (${addDepartment.input})`;
        con.query(addARow, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      });
}

// If user selects this choice, then computer will show data or ask more questions
function showResults(userChoice) {
    if (userChoice.choices === 'view all departments') {
        console.log('user chose to view all departments');
    } else if (userChoice.choices === 'view all roles') {
        console.log('user chose to view all roles');
    } else if (userChoice.choices === 'view all employees') {
        console.log('user chose to view all emplyes');
    } else if (userChoice.choices === 'add a department') {
        console.log('user chose to add a department');
        inquirer.prompt(addDepartment).then(addDepartment => departmentAdd());
    } else if (userChoice.choices === 'add a role') {
        console.log('user chose to add a role');
    } else if (userChoice.choices === 'add an employee') {
        console.log('user chose to add an employee');
    } else if (userChoice.choices === 'update an employee role') {
        console.log('user chose to update a role');
    } else if (userChoice.choices === 'quit') {
        console.log('user chose to return ot home page');
        init();
    } else {
         console.log('Please chose an answer from the provided choices');
         init();
        };
    };

// Initialize app to navigate employee data
function init() {
  inquirer.prompt(questions).then((userChoice) => {
    console.info(questions);
    showResults(userChoice);
  });
}

// Function call to initialize app
init();