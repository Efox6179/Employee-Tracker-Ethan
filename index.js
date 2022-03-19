const mysql = require("mysql");
const inquirer = require("inquirer");
const { prototype } = require("events");
const { start } = require("repl");


const connection = mysql.createConnection({
    host: "local host",
    port: "3001",
    user: "root",
    password: "Ebfox032402!",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) throw err;
    start();
});

function start() {
inquirer.prompt({
    name: "action",
    type: "list",
    message: "Please select an option",
    choices: [
"View all departments",
"View all roles",
"View all employees",
"Add a department",
"Add a role",
"Add employee",
"Update employee",
"Exit"
            ]
})

.then ((answer)=> {
    switch (answer.action){
        case "View all departments":
            viewDepartments();
            break;

            case "View all roles":
                viewRoles();
                break;

                case "View all Employees":
                    viewEmployees();
                    break;

                    case "Add a department":
                        addDepartment();
                        break;

                        case "Add a role":
                            addRole();
                            break;

                            case "Add Employee":
                                addEmployee();
                                break;

                                case "Update employee":
                                    updateEmployee();
                                    break

                                    case "Exit":
                                    connection.end();
                                    break;
                            
            
    }
});

}

function viewDepartments () {
    connection.query("SELECT * FROM department", (err,data) =>{
if (err) throw err;
console.table(data);
start();
    });
}

function viewRoles () {
    connection.query("SELECT * FROM roles", (err,data) =>{
if (err) throw err;
console.table(data);
start();
    });
}

function viewEmployees () {
    connection.query("SELECT * FROM employees", (err,data) =>{
if (err) throw err;
console.table(data);
start();
    });
}

