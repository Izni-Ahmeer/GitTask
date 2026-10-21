export type EmployeeStatus = "active" | "inactive";

export interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  salary: number;
  isActiveStatus: EmployeeStatus;
  department?: string;
}

export const employeeDetails: Employee[] = [
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

export function getEmployeeById(
  list: Employee[],
  employeeId: string,
): Employee | undefined {
  return list.find((employee) => employee.employeeId === employeeId);
}

export function getActiveEmployees(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.isActiveStatus === "active");
}
export function calculateAnnualSalary(monthlySalary: number): number {
  return monthlySalary * 12;
}

export function updateEmployeeSalary(
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

export function formatEmployeeDetails(employee: Employee): string {
  return `Employee ID: ${employee.employeeId}, Name: ${employee.fullName}, Email: ${employee.email}, Salary: ${employee.salary}, Status: ${employee.isActiveStatus}`;
}

export function employeeNames(list: Employee[]): string[] {
  return list.map((employee) => employee.fullName);
}

export function monthSalaryExpenditure(list: Employee[]): number {
  return list.reduce((total, employee) => total + employee.salary, 0);
}

export function sortEmployeesBySalary(list: Employee[]): Employee[] {
  return [...list].sort((a, b) => a.salary - b.salary);
}

export function acceptEmployeeID(list: Employee[], employeeId: string | number): Employee | undefined {
  let normalizedId: string;
  if (typeof employeeId === "string") {
    normalizedId = employeeId.trim();
    if (normalizedId === "") {
      throw new Error("Employee ID cannot be an empty string.");
    }
  } else {
    normalizedId = employeeId.toString();
    if (!/^[A-Za-z0-9]+$/.test(normalizedId)) {
      throw new Error("Employee ID must contain only letters and numbers.");
    }
  }
  return getEmployeeById(list, normalizedId);
}


