type EmployeeStatus = "active" | "inactive";

interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  salary: number;
  isActiveStatus: EmployeeStatus;
  department?: string;
}

const employeeDetails: Employee[] = [
  {
    employeeId: "200624TS",
    fullName: "Izni Ahmeer",
    email: "amin.izniahmeer@gmail.com",
    salary: 50000,
    isActiveStatus: "active",
  },
  {
    employeeId: "200625TS",
    fullName: "John Doe",
    email: "JaneDoe@gmail.com",
    salary: 60000,
    isActiveStatus: "inactive",
  },
  {
    employeeId: "200626TS",
    fullName: "Sarah Perera",
    email: "sarah.perera@example.com",
    salary: 85000,
    isActiveStatus: "active",
  },
  {
    employeeId: "200627TS",
    fullName: "Kevin Fernando",
    email: "kevin.fernando@example.com",
    salary: 45000,
    isActiveStatus: "inactive",
  },
  {
    employeeId: "200628TS",
    fullName: "Amaya Silva",
    email: "amaya.silva@example.com",
    salary: 72000,
    isActiveStatus: "active",
  },
];

function getEmployeeById(
  list: Employee[],
  employeeId: string,
): Employee | undefined {
  return list.find((employee) => employee.employeeId === employeeId);
}

function getActiveEmployees(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.isActiveStatus === "active");
}
function calculateAnnualSalary(monthlySalary: number): number {
  return monthlySalary * 12;
}
function updateEmployeeSalary(
  list: Employee[],
  employeeId: string,
  newSalary: number,
): Employee | undefined {
  if (newSalary <= 0) {
    throw new Error("Salary cannot be negative amount.");
  }
  const employee = getEmployeeById(list, employeeId);
  if (employee) {
    employee.salary = newSalary;
  }
  return employee;
}
function formatEmployeeDetails(employee: Employee): string {
  return `Employee ID: ${employee.employeeId}, Name: ${employee.fullName}, Email: ${employee.email}, Salary: ${employee.salary}, Status: ${employee.isActiveStatus}`;
}
const foundEmployee = getEmployeeById(employeeDetails, "200624TS");

if (foundEmployee) {
  console.log(formatEmployeeDetails(foundEmployee));
} else {
  console.log("Employee not found.");
}
function employeeNames(list: Employee[]): string[] {
  return list.map((employee) => employee.fullName);
}
function monthSalaryExpenditure(list: Employee[]): number {
  return list.reduce((total, employee) => total + employee.salary, 0);
}
function sortEmployeesBySalary(list: Employee[]): Employee[] {
  return [...list].sort((a, b) => a.salary - b.salary);
}
function acceptEmployeeID(list: Employee[], employeeId: string | number): Employee | undefined {
  let normalizedId: string;
  if (typeof employeeId === "string") {
    normalizedId = employeeId.trim();
  } else {
    normalizedId = employeeId.toString();
  }
  return getEmployeeById(list, normalizedId);
}
