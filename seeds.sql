use work_place_db;

insert into department (name)
values ("Legal"), ("Accounting"), ("HR"), ("Sales");

insert into role (title, salary, department_id)
values ("Lawyer", 120000, 1), ("Paralegal", 50000, 1), ("Accountant", 70000, 2), 
("HR Manager", 80000, 3), ("Secretary", 40000, 3), ("Sales Lead", 70000, 4), 
("Salesman", 50000, 4);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Saul", "Goodman", 1, null), ("Mike", "Ehrmantraut", 2, 1), ("Skyler", "White", 3, null), 
("Gus", "Fring", 4, null), ("Jane", "Margolis", 5, 4), ("Walter", "White", 6, null), 
("Jesse", "Pinkman", 7, 6), ("Brandon", "Mayhew", 7, 6), ("Skinny", "Pete", 7, 6);