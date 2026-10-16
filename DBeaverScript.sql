USE fused_fli;

CREATE TABLE employees (
	id INT AUTO_INCREMENT PRIMARY KEY,
	employee_code VARCHAR (20) NOT NULL UNIQUE,
	full_name VARCHAR (100) NOT NULL,
	email VARCHAR (200) UNIQUE,
	department_id INT,
	salary DECIMAL (10, 2),
	status ENUM ('Active', 'Inactive'),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
	FOREIGN KEY (department_id) REFERENCES department(id)
	);

CREATE TABLE department (
	id INT AUTO_INCREMENT PRIMARY KEY,
	department_name VARCHAR (200) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
	);

DESCRIBE department;

-- SHOW TABLES LIKE 'depart%';
-- SHOW TABLES LIKE 'employ%';

SELECT * FROM department;
SELECT * FROM employees;

INSERT INTO department (department_name) VALUES
  ('Engineering'),
  ('HR'),
  ('Finance'),
  ('Marketing'),
  ('Support'),
  ('Research');

INSERT INTO employees (employee_code, full_name, email, department_id, salary, status) VALUES
  ('EMP001', 'Amal Perera',         'amal.perera@example.com',     1,    185000.00, 'Active'),
  ('EMP002', 'Sahan Fernando',      'sahan.fernando@example.com',  1,    160000.00, 'Active'),
  ('EMP003', 'Nadeesha Silva',      'nadeesha.silva@example.com',  1,    142000.00, 'Active'),
  ('EMP004', 'Kasun Jayawardena',   'kasun.j@example.com',         1,    210000.00, 'Active'),
  ('EMP005', 'Sachini Wickrama',    NULL,                          1,     98000.00, 'Inactive'),
  ('EMP006', 'Ruwan Bandara',       'ruwan.bandara@example.com',   1,    125000.00, 'Active'),
  ('EMP007', 'Dilini Rathnayake',   'dilini.r@example.com',        2,     85000.00, 'Active'),
  ('EMP008', 'Shehan Gunasekara',   'shehan.g@example.com',        2,     72000.00, 'Inactive'),
  ('EMP009', 'Tharushi Mendis',     NULL,                          2,     90000.00, 'Active'),
  ('EMP010', 'Malith Herath',       'malith.herath@example.com',   3,    130000.00, 'Active'),
  ('EMP011', 'Sanduni Peiris',      'sanduni.peiris@example.com',  3,    115000.00, 'Active'),
  ('EMP012', 'Chamara Dissanayake', 'chamara.d@example.com',       3,    155000.00, 'Active'),
  ('EMP013', 'Ishara Kumari',       'ishara.kumari@example.com',   3,     67000.00, 'Inactive'),
  ('EMP014', 'Lahiru Senanayake',   'lahiru.s@example.com',        4,     95000.00, 'Active'),
  ('EMP015', 'Anjali Wijesinghe',   'anjali.w@example.com',        4,    102000.00, 'Active'),
  ('EMP016', 'Pasindu Karunaratne', 'pasindu.k@example.com',       4,     78000.00, 'Inactive'),
  ('EMP017', 'Hiruni Abeysekara',   'hiruni.a@example.com',        5,     60000.00, 'Active'),
  ('EMP018', 'Supun Rajapaksha',    'supun.r@example.com',         5,     64000.00, 'Active'),
  ('EMP019', 'Nimesha De Alwis',    NULL,                          5,     58000.00, 'Inactive'),
  ('EMP020', 'Dasun Ekanayake',     'dasun.e@example.com',         NULL,  70000.00, 'Active');

SELECT COUNT(*) AS department_count FROM department; 
SELECT COUNT(*) AS employee_count FROM employees;     

SELECT * FROM employees;

SELECT  full_name, email, salary
FROM employees;

SELECT full_name
FROM employees 
WHERE department_id = 2;

SELECT * 
FROM employees 
WHERE salary > 100000.00;

SELECT *
FROM employees 
WHERE department_id = 2 AND status = 'Active';

SELECT *
FROM employees 
WHERE salary BETWEEN 50000.00 AND 100000.00 AND (department_id = 1 OR department_id = 2) AND Full_name LIKE 's%' AND status IN ('Active', 'Inactive');

SELECT * 
FROM employees
ORDER BY salary DESC LIMIT 5;

SELECT *
FROM employees 
WHERE email IS NULL;

INSERT INTO department (department_name)
VALUES ('Operations');

INSERT INTO employees (employee_code, full_name, email, department_id, salary, status)
VALUES ('EMP021', 'Test Employee', 'test.employee@example.com', 7, 75000.00, 'Active');

UPDATE employees 
SET salary = 80000.00
WHERE employee_code = 'EMP021';

UPDATE employees 
SET salary = salary + 10000
WHERE department_id = 5;

DELETE FROM employees 
WHERE employee_code = 'EMP021';

SELECT COUNT(*) 
FROM employees;

SELECT 
SUM(salary)
FROM employees;

SELECT department_id,
COUNT(*)
FROM employees
GROUP BY department_id;

SELECT department_id,
COUNT (*) 
FROM employees
GROUP BY department_id
HAVING COUNT(*)>4;

SELECT employees.full_name, department.department_name
FROM employees 
INNER JOIN department ON employees.department_id = department.id;

SELECT department.department_name, employees.department_id
FROM department 
LEFT JOIN employees ON department.id = employees.department_id;

SELECT employees.full_name, department.department_name
FROM employees
INNER JOIN department ON employees.department_id = department.id
WHERE department_name = 'HR';

SELECT full_name, salary
FROM employees 
WHERE salary >= (SELECT AVG(salary) FROM employees);

SELECT e.department_id, e.full_name, e.salary
FROM employees e 
WHERE salary = (SELECT MAX(salary) FROM employees WHERE department_id = e.department_id);

SELECT full_name, department_id
FROM employees
WHERE department_id IN (1, 3);

SELECT e.department_id, e.full_name
FROM employees e 
WHERE e.department_id IN (SELECT department_id FROM employees GROUP BY department_id HAVING COUNT (*) > 3);

SET autocommit = 0;

START TRANSACTION;

UPDATE employees e
SET e.salary = e.salary + 102000.00
WHERE e.employee_code = 'EMP019';

ROLLBACK;
