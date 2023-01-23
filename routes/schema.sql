DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (deparmtnet_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT, -- to hold reference to employee role,
  manager_id INT -- `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)
);

show tables;

describe employee;

describe employee_db;