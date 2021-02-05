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

const viewByDept = () => {
    inquirer.prompt({
        message: 'Which department would you like to view by?',
        name: 'deptQ',
        type: 'list',
        choices: ['Legal', 'Accounting', 'HR', 'Sales']
    }).then(answer => {
        const viewBy = (something) => {
            connection.query(
            'SELECT employee.id, first_name, last_name, title, department, salary\
            FROM work_place_db.department\
            JOIN work_place_db.role\
            ON department.id = role.department_id\
            JOIN work_place_db.employee\
            ON role.id = employee.role_id WHERE department = ?',
            {
                department: something,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`\nEmployees in ${something}\n`);
                console.table(res);
                start();
            });
        };

        switch (answer.deptQ) {
            case 'Legal':
                viewBy(answer.deptQ);
                break;
            case 'Accounting':
                viewBy(answer.deptQ);
                break;
            case 'HR':
                viewBy(answer.deptQ);
                break;
            case 'Sales':
                viewBy(answer.deptQ);
                break;
        }
    });
};

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

const start = () => {
    console.log('Welcome to the Employee Tracker!\n')
    inquirer.prompt({
        message: 'What would you like to do?',
        name: 'mainQ',
        type: 'list',
        choices: ['View all employees', 'View by department', 'View Departments', 'View Roles', 'Exit']
    }).then(answer => {
        // console.log(answer.mainQ);
        switch (answer.mainQ) {
            case 'Exit':
                console.log('\nHave a nice day!\n');
                connection.end();
                break;
            case 'View all employees':
                viewEmployees();
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