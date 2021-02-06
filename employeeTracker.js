const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'M@trixt15',
    database: 'work_place_db',
});

//------Views All Employees------
const viewEmployees = () => {
    connection.query(
        'SELECT employee.id, first_name, last_name, title, department, salary\
        FROM work_place_db.department\
        JOIN work_place_db.role\
        ON department.id = role.department_id\
        JOIN work_place_db.employee\
        ON role.id = employee.role_id', 
        (err, res) => {
            if (err) throw err;
            console.log('\nAll Employees\n');
            console.table(res);
            start();
    });
};

//------View BY department------
const viewByDept = () => {
    inquirer.prompt({
        message: 'Which department would you like to view by?',
        name: 'deptQ',
        type: 'list',
        choices: ['Legal', 'Accounting', 'HR', 'Sales']
    }).then(answer => {
        const viewBy = () => {
            connection.query(
                `SELECT employee.id, first_name, last_name, title, department, salary\
                FROM work_place_db.department\
                JOIN work_place_db.role\
                ON department.id = role.department_id\
                JOIN work_place_db.employee\
                ON role.id = employee.role_id\
                WHERE department = "${answer.deptQ}"`,
                (err, res) => {
                    if (err) throw err;
                    console.log(`\nEmployees in ${answer.deptQ}\n`);
                    console.table(res);
                    start();
            });
        };

        switch (answer.deptQ) {
            case 'Legal':
                viewBy();
                break;
            case 'Accounting':
                viewBy();
                break;
            case 'HR':
                viewBy();
                break;
            case 'Sales':
                viewBy();
                break;
        }
    });
};

//------Views departments------
const viewDepartments = () => {
    connection.query(
        'SELECT * FROM work_place_db.department', 
        (err, res) => {
            if (err) throw err;
            console.log('\nAll Departments\n');
            console.table(res);
            start();
        });
};

//------Views Roles------
const viewRoles = () => {
    connection.query(
        'SELECT id, title, salary FROM work_place_db.role', 
        (err, res) => {
            if (err) throw err;
            console.log('\nAll Roles\n');
            console.table(res);
            start();
        });
};

//------Adds Employees------
const addEmp = () => {
    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: 'firstName',
            type: 'input'
        },
        {
            message: "What is the employee's last name?",
            name: 'lastName',
            type: 'input'
        },
        {
            message: "What is the employee's role ID? (1-Lawyer, 2-Paralegal, 3-Accountant, 4-HR Manager, 5-Secretary, 6-Sales Lead, 7-Salesman)",
            name: 'title',
            type: 'list',
            choices: ['1', '2', '3', '4', '5', '6', '7']
        },
        {
            message: "Who is their manager? (1-Saul Goodman, 3-Skyler White, 4-Gus Fring, 6-Walter White)",
            name: 'manager',
            type: 'list',
            choices: ['1', '3', '4', '6']
        }
    ]).then(answer => {
        connection.query(
            `Insert INTO employee (first_name, last_name, role_id) Values ('${answer.firstName}', '${answer.lastName}', ${answer.title})`, 
            (err, res) => {
                if (err) throw err;
                start();
            });    
    })
};

//------Removes Employees------
const remEmp = () => {
    inquirer.prompt([
        {
            message: "What is the employee's ID?",
            name: 'empId',
            type: 'input'
        }
    ]).then(answer => {
        connection.query(
            `DELETE FROM employee WHERE id = ${answer.empId}`, 
            (err, res) => {
                if (err) throw err;
                start();
            });
    })
};

//------"Home Screen" of application------
const start = () => {
    console.log('Welcome to the Employee Tracker!\n')
    inquirer.prompt({
        message: 'What would you like to do?',
        name: 'mainQ',
        type: 'list',
        choices: ['View all employees', 'Add Employee', 'Remove Employee', 'View by department', 'View Departments', 'View Roles', 'Exit']
    }).then(answer => {
        switch (answer.mainQ) {
            case 'Exit':
                console.log('\nHave a nice day!\n');
                connection.end();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmp();
                break;
            case 'Remove Employee':
                remEmp();
                break;
            case 'View by department':
                viewByDept();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
        }
    })
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
});