const inquirer = require('inquirer'); 
// const inquire = require('./node_modules/inquire');
const mysql = require('mysql2'); // require sql
const express = require('express'); // require express

const PORT = process.env.PORT || 3001; // local host
const app = express(); // launch express app

app.use(express.urlencoded({ extended: false })); // middleware
app.use(express.json()); // middleware

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "codecode123",
  database: "employees_db"
});
  
app.use((req, res) => {
res.status(404).end();
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

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

departmentAdd = (userAnswer) => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var addARow = `INSERT INTO department (id,name) VALUES (6, ${userAnswer.input})`;
        con.query(addARow, function (err, result) {
            if (err) throw(err);
            console.log(result);
            console.info("Added a table row");
        });
      });
}

// If user selects this choice, then computer will show data or ask more questions
function showResults(userChoice) {
    if (userChoice.choices === 'view all departments') {
        console.log('user chose to view all departments');
        // add logic to show all departments
    } else if (userChoice.choices === 'view all roles') {
        console.log('user chose to view all roles');
        // add logic to view all roles
    } else if (userChoice.choices === 'view all employees') {
        console.log('user chose to view all emplyes');
        // add logic to view all employees
    } else if (userChoice.choices === 'add a department') {
        console.log("user chose to add a department");
        inquirer.prompt(addDepartment).then((userAnswer) => departmentAdd(userAnswer));
    } else if (userChoice.choices === 'add a role') {
        console.log('user chose to add a role');
        // logic to add a role
    } else if (userChoice.choices === 'add an employee') {
        console.log('user chose to add an employee');
        // logic to add an employee
    } else if (userChoice.choices === 'update an employee role') {
        console.log('user chose to update a role');
        // logic to update an employee role
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