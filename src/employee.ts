export type EmployeeStatus = "active" | "inactive";

export interface Employee {
  employeeId: string;
  fullName: string;
  email?: string;
  salary: number;
  status: EmployeeStatus;
  department?: string;
}

export const employeeDetails: Employee[] = [
  {
    employeeId: "200624TS",
    fullName: "Izni Ahmeer",
    email: "Izni@example.com",
    salary: 50000,
    status: "active",
  },
  {
    employeeId: "200625TS",
    fullName: "John Doe",
    email: "example2@example.com",
    salary: 60000,
    status: "inactive",
  },
  {
    employeeId: "200626TS",
    fullName: "Sarah Perera",
    email: "example3@example.com",
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

export function getEmployeeById(
  list: Employee[],
  employeeId: string,
): Employee | undefined {
  return list.find((employee) => employee.employeeId === employeeId);
}

export function getActiveEmployees(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.status === "active");
}

export function calculateAnnualSalary(monthlySalary: number): number {
  return monthlySalary * 12;
}

export function updateEmployeeSalary(
  list: Employee[],
  employeeId: string,
  newSalary: number,
): Employee {
  if (!Number.isFinite(newSalary) || newSalary <= 0) {
    throw new Error("Salary must be a positive, finite number.");
  }
  const employee = getEmployeeById(list, employeeId);
  if (!employee) {
    throw new Error("Employee not found.");
  }
  employee.salary = newSalary;
  return employee;
}

export function formatEmployeeDetails(employee: Employee): string {
  return `Employee ID: ${employee.employeeId}, Name: ${employee.fullName}, Email: ${employee.email ?? "N/A"}, Salary: ${employee.salary}, Status: ${employee.status}`;
}

export function employeeNames(list: Employee[]): string[] {
  return list.map((employee) => employee.fullName);
}

export function calculateTotalMonthlySalary(list: Employee[]): number {
  return list.reduce((total, employee) => total + employee.salary, 0);
}

export function sortEmployeesBySalary(list: Employee[]): Employee[] {
  return [...list].sort((a, b) => a.salary - b.salary);
}

export function findEmployeeByAnyId(
  list: Employee[],
  employeeId: string | number,
): Employee | undefined {
  let normalizedId: string;
  if (typeof employeeId === "string") {
    normalizedId = employeeId.trim();
    if (!/^[A-Za-z0-9]+$/.test(normalizedId)) {
      throw new Error("Employee ID must be alphanumeric.");
    }
  } else {
    if (!Number.isInteger(employeeId) || employeeId <= 0) {
      throw new Error("Employee ID must be a positive whole number.");
    }
    normalizedId = employeeId.toString();
  }
  return getEmployeeById(list, normalizedId);
}

export function fetchEmployeeEmailByID(
  list: Employee[],
  employeeId: string,
): string {
  if (employeeId === "") {
    throw new Error("Employee ID cannot be empty.");
  }
  const employee = getEmployeeById(list, employeeId);
  if (employee === undefined) {
    throw new Error("Employee ID not found. Try again with a valid ID.");
  }
  return employee.email ?? "Email not available for this employee.";
}
