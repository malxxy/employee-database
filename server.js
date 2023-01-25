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
    console.log(userAnswer);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(`INSERT INTO department (name) VALUES (?)`,userAnswer.addDepart,function (err, result) {
            if (err) throw(err);
            console.log(result);
            console.info("Added a table row");
        });
      });
};

const addRole = [
    {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'addNewRole',
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'addSalary',
    },
    {
        type: 'input',
        message: 'What is the department id (1, 2, 3, 4, or 5)?',
        name: 'addID',
    }
]

roleAdd = (userAnswer) => {
    console.log(userAnswer);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(`INSERT INTO roles (title,salary,department_id) VALUES (?)`,(userAnswer.addNewRole,userAnswer.addSalary,userAnswer.addID),function (err) {
            console.info("Added a row to the role table");
        });
      });
};

// first_name,last_name,role_id,manager_id
const addEmployee = [
    {
        type: 'input',
        message: 'What is the first name of the employee?',
        name: 'addFirst',
    },
    {
        type: 'input',
        message: 'What is the last name of the employee?',
        name: 'addLast',
    },
    {
        type: 'input',
        message: 'What is the id of the role (1,2,3,4,5)?',
        name: 'addRoleID',
    },
    {
        type: 'input',
        message: 'What is the id of the role (1 or 2)?',
        name: 'addManagerID',
    }
]

employeeAdd = (userAnswer) => {
    console.log(userAnswer);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(`INSERT INTO roles (first_name,last_name,role_id,manager_id) VALUES (?)`,(userAnswer.addFirst,userAnswer.addLast,userAnswer.addRoleID,userAnswer.addManagerID),function (err) {
            console.info("Added a row to the employee table");
        });
      });
};

// option to use switch in the future instead of if else. makes it shorter // future reference - turn into switch! more scalable and readable
// If user selects this choice, then computer will show data or ask more questions
function showResults(userChoice) {
    if (userChoice.choices === 'view all departments') {
        console.log('user chose to view all departments');
        init();
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
        inquirer.prompt(addRole).then((userAnswer) => roleAdd(userAnswer));
    } else if (userChoice.choices === 'add an employee') {
        console.log('user chose to add an employee');
        inquirer.prompt(addEmployee).then((userAnswer) => employeeAdd(userAnswer));
    } else if (userChoice.choices === 'update an employee role') {
        console.log('user chose to update a role');
        // logic to update an employee role
    } else if (userChoice.choices === 'quit') {
        console.log('user chose to exit app. Bye!');
        // logic to close app
    } else {
         console.log('Please chose an answer from the provided choices');
         init();
        };
    };

// Initialize app to navigate employee data
function init() {
  inquirer.prompt(questions).then((userChoice) => {
    showResults(userChoice);
  });
}

// Function call to initialize app
init();