type EmployeeStatus = "active" | "inactive";

interface Employee {
  employeeId: string;
  fullName: string;
  email?: string;
  salary: number;
  status: EmployeeStatus;
  department?: string;
}

const employeeDetails: Employee[] = [
  {
    employeeId: "200624TS",
    fullName: "Izni Ahmeer",
    email: "amin.izniahmeer@gmail.com",
    salary: 50000,
    status: "active",
  },
  {
    employeeId: "200625TS",
    fullName: "John Doe",
    email: "JaneDoe@gmail.com",
    salary: 60000,
    status: "inactive",
  },
  {
    employeeId: "200626TS",
    fullName: "Sarah Perera",
    email: "sarah.perera@example.com",
    salary: 85000,
    status: "active",
  },
  {
    employeeId: "200627TS",
    fullName: "Kevin Fernando",
    email: "kevin.fernando@example.com",
    salary: 45000,
    status: "inactive",
  },
  {
    employeeId: "200628TS",
    fullName: "Amaya Silva",
    email: "amaya.silva@example.com",
    salary: 72000,
    status: "active",
  },
    {
    employeeId: "200629TS",
    fullName: "Nimal Jayasinghe",
    salary: 55000,
    status: "active",
  },
];

function getEmployeeById(
  list: Employee[],
  employeeId: string,
): Employee | undefined {
  return list.find((employee) => employee.employeeId === employeeId);
}

function getActiveEmployees(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.status === "active");
}
function calculateAnnualSalary(monthlySalary: number): number {
  return monthlySalary * 12;
}

function updateEmployeeSalary(
  list: Employee[],
  employeeId: string,
  newSalary: number,
): Employee | undefined {
  if (!Number.isFinite(newSalary) || newSalary <= 0) {
    throw new Error("Salary must be a finite or positive number.");
  }
  const employee = getEmployeeById(list, employeeId);
  if (!employee) {
    throw new Error("Employee not found.");
  }
  employee.salary = newSalary;
  return employee;
}

function formatEmployeeDetails(employee: Employee): string {
  return `Employee ID: ${employee.employeeId}, Name: ${employee.fullName}, Email: ${employee.email}, Salary: ${employee.salary}, Status: ${employee.status}`;
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

function calculateTotalMonthlySalary(list: Employee[]): number {
  return list.reduce((total, employee) => total + employee.salary, 0);
}

function sortEmployeesBySalary(list: Employee[]): Employee[] {
  return [...list].sort((a, b) => a.salary - b.salary);
}

function findEmployeeByAnyId(list: Employee[], employeeId: string | number): Employee | undefined {
  let normalizedId: string;
  if (typeof employeeId === "string") {
    normalizedId = employeeId.trim();
    if (!/^[A-Za-z0-9]+$/.test(normalizedId)) {
      throw new Error("Employee ID must be an alphanumeric and number string.");
    }
  } else {
    normalizedId = employeeId.toString();
    if (!Number.isInteger(employeeId) || Number(normalizedId) <= 0) {
      throw new Error("Employee ID must be a positive number.");
    }
  }
  return getEmployeeById(list, normalizedId);
}

function fetchEmployeeEmailByID(list: Employee[], ID: string): string {
const employee = getEmployeeById(list, ID);
const email = employee?.email;
 
  if (ID === "") {
  throw new Error("Employee ID cannot be empty.");
  }
  if (employee === undefined) {
    throw new Error("Employee ID not found. Try again with a valid ID.");
  }
  return email ?? "Email not available for this employee or doesn't have any associated email connected to the employee ID.";
} 
    
  

