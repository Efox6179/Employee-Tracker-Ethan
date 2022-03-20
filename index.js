const mysql = require('mysql');
const inquirer = require('inquirer');




var connection = mysql.createConnection({
    host: 'localhost',
    
   user: 'root',
    password: 'Ebfox032402!',
    database: 'employee_tracker_db',
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected✅");
    start();
});
function start () {
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
"Exit"
            ]
})

.then ((answer)=> {
    switch (answer.action){
        case "View all departments":
            viewDepartments();
            break;

            case "View all roles":
                viewRole();
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
                                addEmployees();
                                break;

                                    case "Exit":
                                   connection.end();
                                   console.log("Session Ended ❌")
                                    break;
                            
            
    }
});

}

function viewDepartments () {
    connection.query("SELECT * FROM department", (err, data) =>{
if (err) throw err;
console.table(data);
start();
    });
}

function viewRole () {
    connection.query("SELECT * FROM role", (err, data) =>{
if (err) throw err;
console.table(data);
start();
    });
}

function viewEmployees () {
    connection.query("SELECT * FROM employee", (err, data) =>{
if (err) throw err;
console.table(data);
start();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the new department name?",
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    console.log("Please enter department name.");
                }
            }
        },
    ]).then(answer => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department
            },
            (err) => {
                if (err) throw err;
                console.log(`New department ${answer.department} has been added!`);
                start();
            }
        );
    });
}

function addRole() {
    const sql = "SELECT * FROM department";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "title",
                type: "imput",
                message: "What is the name of this new role?",
                validate: (value) => {
                    if (value) {
                        return true;
                    }
                    else{
                        console.log("What is the name of this new role?");
                    }
                }
            },
            {
                name: "salary",
                type: "imput",
                message: "What is this employee paid?",
                validate: (value) => {
                    if(value) {
                        return true;
                    }
                    else{
                        console.log("What is this employee paid?")
                    }
                }
            },

            
            {
                name: "department",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    return choiceArray;
                },
                message: "What department is this new role under?",
            }
        ]).then(answer => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === answer.department) {
                    chosenDept = results[i];
                }
            }

            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: chosenDept.id
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New role ${answer.title} has been added!`);
                    start();
                }
            )
        });
    });
}


/*function addEmployees() {
    const sql = "SELECT * FROM employee, role";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the first name.");
                    }
                }
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the last name.");
                    }
                }
            },
            {
                name: "role",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                },
                message: "What is the role?"
            }
        ]).then(answer => {
            let chosenRole;

            for (let i = 0; i < results.length; i++) {
                if (results[i].title === answer.role) {
                    chosenRole = results[i];
                }
            }

            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: chosenRole.id,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New employee ${answer.firstName} ${answer.lastName} has been added! as a ${answer.role}`);
                    start();
                }
            )
        });
    });
}
*/
