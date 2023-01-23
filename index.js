// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

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

// addtoTable => {console.log('addtoTable')};


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
        // inquirer.prompt(addDepartment).then(addtoTable());
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