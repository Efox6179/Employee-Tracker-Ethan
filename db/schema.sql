DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(9,2) NOT NULL,
department_id INTEGER NOT NULL,
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR (30),
    role_id INTEGER,
    manager_id INTEGER
);

SELECT name
FROM department
JOIN roles
ON department.id = roles.department_id;

SELECT title, salary, department_id
FROM roles
JOIN department
ON roles.department_id = department.id;

SELECT first_name, last_name, role_id, manager_id
FROM employee
JOIN roles
ON employee.roles_id = roles.department_id;

