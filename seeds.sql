use work_place_db;

insert into department (name)
values ("Legal"), ("Accounting"), ("HR"), ("Sales");

insert into role (title, salary, department_id)
values ("Lawyer", 120000, 100), ("Paralegal", 50000, 100), ("Accountant", 70000, 200), 
("HR Manager", 80000, 300), ("Secretary", 40000, 300), ("Sales Lead", 70000, 400), 
("Salesman", 50000, 400);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Saul", "Goodman", 101, null), ("Mike", "Ehrmantraut", 102, 111), ("Skyler", "White", 201, null), 
("Gus", "Fring", 301, null), ("Jane", "Margolis", 302, 311), ("Walter", "White", 401, null), 
("Jesse", "Pinkman", 402, 411), ("Brandon", "Mayhew", 402, 411), ("Skinny", "Pete", 402, 411);