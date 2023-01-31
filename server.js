const inquirer = require('inquirer'); // const inquire = require('./node_modules/inquire');
const { map } = require('rxjs');
const con = require('./db/connection');
require('console.table'); // variable console.table into global scope
// let employeeChoices = [];

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
    con.query(`INSERT INTO department (name) VALUES (?)`,userAnswer.addDepart,function (err, result) {
        if (err) throw(err);
        console.log(result);
        console.info("Added a table row");
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
    console.log(userAnswer)
        con.query(`INSERT INTO roles (title,salary,department_id) VALUES (?)`,(userAnswer.addNewRole,userAnswer.addSalary,userAnswer.addID),function (err) {
            console.info("Added a row to the role table");
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
        message: 'What is the id of the manager (null,1 or 2)?',
        name: 'addManagerID',
    }
]

employeeAdd = (userAnswer) => {
    console.log(userAnswer);
        con.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?)`,(userAnswer.addFirst,userAnswer.addLast,userAnswer.addRoleID,userAnswer.addManagerID),function (err) {
            console.info("Added a row to the employee table");
        });
};

const pullEmployeeList = () => {
    return con.promise().query(`SELECT * FROM employee`).then(function (employeeData) {
         employeeData[0].map(employee => ({ // map returns an array
            value:employee.id,
            name:employee.first_name + " " + employee.last_name,
        }));
    });
};

console.log(pullEmployeeList().then(data=> console.log(data)));

const updateEmployee = [
    {
        type: 'list',
        choices: pullEmployeeList(),
        message: 'What employee would you like to update?',
        name: 'employeeList',
    },
    {
        type: 'input',
        message: 'What is the updated id of the role (1,2,3,4,5)?',
        name: 'updateRoleID',
    },
    {
        type: 'input',
        message: 'What is the updated id of the manager (null, 1 or 2)?',
        name: 'updateManagerID',
    }
]

employeeUpdate = (userAnswer) => {
    console.log(userAnswer);
        con.query(`UPDATE employee (role_id,manager_id) VALUES (?,?)`,(userAnswer.updateRoleID,userAnswer.updateManagerID),function (err) {
            console.info("Added a row to the employee table");
        });
};

// option to use switch in the future instead of if else. makes it shorter 
// future reference - turn into switch! more scalable and readable
// If user selects this choice, then computer will show data or ask more questions

// promises - javascript - i promise to get back to you....
function showResults(userChoice) {
    if (userChoice.choices === 'view all departments') {
        console.log('user chose to view all departments');
        con.promise().query(`SELECT * FROM department`).then(function (departmentData) {
            console.table(departmentData[0]);
            setTimeout(init,2000);
        });
    } else if (userChoice.choices === 'view all roles') {
        console.log('user chose to view all roles');
        con.promise().query(`SELECT * FROM roles`).then(function (roleData) {
            console.table(roleData[0]);
            setTimeout(init,2000);
        });
    } else if (userChoice.choices === 'view all employees') {
        console.log('user chose to view all emplyes');
        con.promise().query(`SELECT * FROM employee`).then(function (employeeData) {
            console.table(employeeData[0]);
            setTimeout(init,2000);
        });
    } else if (userChoice.choices === 'add a department') {
        console.log("user chose to add a department");
        inquirer.prompt(addDepartment).then((userAnswer) => {
            departmentAdd(userAnswer);
            con.promise().query(`SELECT * FROM department`).then(function (departmentData) {
                console.table(departmentData[0]);
                setTimeout(init,2000);
            });
        });
    } else if (userChoice.choices === 'add a role') {
        console.log('user chose to add a role');
        inquirer.prompt(addRole).then((userAnswer) => {
            roleAdd(userAnswer);
            con.promise().query(`SELECT * FROM role`).then(function (roleData) {
                console.table(roleData[0]);
                setTimeout(init,2000);
            });
        });
    } else if (userChoice.choices === 'add an employee') {
        console.log('user chose to add an employee');
        inquirer.prompt(addEmployee).then((userAnswer) => {
            employeeAdd(userAnswer);
            con.promise().query(`SELECT * FROM role`).then(function (roleData) {
                console.table(roleData[0]);
                setTimeout(init,2000);
            });
        });
    } else if (userChoice.choices === 'update an employee role') {
        console.log('user chose to update a role');
        // function to pull employee list
        inquirer.prompt(updateEmployee).then((userAnswer) => {
            employeeUpdate(userAnswer);
            con.promise().query(`SELECT * FROM employee`).then(function (employeeData) {
                console.table(employeeData[0]);
                setTimeout(init,2000);
            });
    });
    } else if (userChoice.choices === 'quit') {
        console.log('user chose to exit app. Bye!');
        setTimeout(process.exit(),2000)
    } else {
         console.log('Please chose an answer from the provided choices');
         setTimeout(init,2000);
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