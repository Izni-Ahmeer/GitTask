
USE fused_fli;

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