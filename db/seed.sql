USE employee_tracker_db;

INSERT INTO department(names)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles(title, salary, department_id)
VALUES 
("Sales Lead", 450000, 1),
("Salesperson", 250000, 1),
("Lead Engineer", 325000, 2),
("Software Engineer", 175000, 2),
("Account Manager", 195000, 3),
("Accountant", 90000, 3),
("Legal Team Lead", 560000, 4),
("Lawyer", 390000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Joshua", "Allen", 1, NULL),
("Riley", "Burnett", 2, 1),
("Joseph", "Howell" ,3, NULL),
("Ethan", "Fox", 4, 3),
("Jesse", "Hanses", 5, NULL),
("Jack", "Lemon", 6, 5),
("Jeff", "Jackson", 7, NULL),
("Jillian", "Danza", 8, 7),
("Michael", "Pipes", 9, 3);