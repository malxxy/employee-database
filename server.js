const inquirer = require('inquirer'); // const inquire = require('./node_modules/inquire');
const { map } = require('rxjs');
const con = require('./db/connection'); // require connection
require('console.table'); // variable console.table into global scope

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
        console.log('user chose to view all employes');
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
            con.promise().query(`SELECT * FROM roles`).then(function (roleData) {
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
        function updateRole(){
            const sql = `SELECT * FROM employee ORDER BY last_name`;
            con.query(sql, (err, res) => {
                if (err) throw err
                const employee = res.map(({ id, first_name, last_name }) => ({
                 value: id,
                 name: `${first_name} ${last_name}`,
               }));
                     return inquirer.prompt([
                     {
                         name: 'title',
                         type: 'rawlist',
                         message: 'select employee to update their role',
                         choices: employee,
                     },
                 ]).then(answers => {
                     const sql = `SELECT * FROM roles`;
                     con.query(sql, (err, res) => {
                         if (err) throw err
                             const role = res.map(({ id, title, salary }) => ({
                             value: id,
                             title: `${title}`,
                             salary: `${salary}`,
                             name: `${title}`,
                         }));
                         return inquirer.prompt([
                             {
                             type: 'rawlist',
                             name: 'role',
                             message: 'select role',
                             choices: role,
                             }
                         ]).then(ans =>{
                                 const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                                 const params = [ans.role, answers.title]
                                 // console.log(answers.title)
                                 // console.log(ans.role)
                                 con.query(sql, params, (err, res) => {
                                   if (err) throw err;
                                   init();
                                 });
                         });
                     });
                 });
             }
         )};
         updateRole();
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