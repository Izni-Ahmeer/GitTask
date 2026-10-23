import { test, expect } from "vitest";
import {
  employeeDetails,
  getEmployeeById,
  getActiveEmployees,
  calculateAnnualSalary,
  updateEmployeeSalary,
  employeeNames,
  calculateTotalMonthlySalary,
  sortEmployeesBySalary,
  findEmployeeByAnyId,
  fetchEmployeeEmailByID,
  formatEmployeeDetails,
} from "./employee.ts";
import type { Employee } from "./employee.ts";

// this makes a fresh copy of the employees for each test
// so updating a salary in one test doesn't break the other tests
function getTestList(): Employee[] {
  return employeeDetails.map((employee) => ({ ...employee }));
}

test("employee can be found using a valid ID", () => {
  const employee = getEmployeeById(getTestList(), "200624TS");
  expect(employee?.fullName).toBe("Izni Ahmeer");
});

test("unknown employee ID returns undefined", () => {
  const employee = getEmployeeById(getTestList(), "999999TS");
  expect(employee).toBeUndefined();
});

test("active employees are filtered correctly", () => {
  const activeEmployees = getActiveEmployees(getTestList());
  expect(activeEmployees).toHaveLength(4);
  for (const employee of activeEmployees) {
    expect(employee.status).toBe("active");
  }
});

test("annual salary is calculated correctly", () => {
  expect(calculateAnnualSalary(5000)).toBe(60000);
});

test("salary update accepts a valid value", () => {
  const list = getTestList();
  const employee = updateEmployeeSalary(list, "200624TS", 65000);
  expect(employee.salary).toBe(65000);
});

test("salary update throws when the employee does not exist", () => {
  expect(() => updateEmployeeSalary(getTestList(), "999999TS", 65000)).toThrow();
});

test("negative salary is rejected", () => {
  expect(() => updateEmployeeSalary(getTestList(), "200624TS", -500)).toThrow();
});

test("NaN and infinite salary values are rejected", () => {
  expect(() => updateEmployeeSalary(getTestList(), "200624TS", NaN)).toThrow();
  expect(() => updateEmployeeSalary(getTestList(), "200624TS", Infinity)).toThrow();
  expect(() => updateEmployeeSalary(getTestList(), "200624TS", -Infinity)).toThrow();
});

test("empty employee arrays are handled correctly", () => {
  const emptyList: Employee[] = [];
  expect(getEmployeeById(emptyList, "200624TS")).toBeUndefined();
  expect(getActiveEmployees(emptyList)).toHaveLength(0);
  expect(employeeNames(emptyList)).toHaveLength(0);
  expect(calculateTotalMonthlySalary(emptyList)).toBe(0);
  expect(sortEmployeesBySalary(emptyList)).toHaveLength(0);
});

test("missing email address is handled correctly", () => {
  // Nimal (200629TS) doesn't have an email
  const email = fetchEmployeeEmailByID(getTestList(), "200629TS");
  expect(email).toBe("Email not available for this employee.");
});

test("email is returned when the employee has one", () => {
  const email = fetchEmployeeEmailByID(getTestList(), "200624TS");
  expect(email).toBe("Izni@example.com");
});

test("string employee IDs are handled correctly", () => {
  const employee = findEmployeeByAnyId(getTestList(), "  200624TS  ");
  expect(employee?.fullName).toBe("Izni Ahmeer");
  expect(() => findEmployeeByAnyId(getTestList(), "200-624")).toThrow();
});

test("numeric employee IDs are handled correctly", () => {
  // the sample data IDs end in "TS", so this uses a list with a number-only ID
  const list: Employee[] = [
    { employeeId: "1001", fullName: "Test User", salary: 1000, status: "active" },
  ];
  expect(findEmployeeByAnyId(list, 1001)?.fullName).toBe("Test User");
  expect(() => findEmployeeByAnyId(list, -5)).toThrow();
  expect(() => findEmployeeByAnyId(list, 1.5)).toThrow();
  expect(() => findEmployeeByAnyId(list, NaN)).toThrow();
});

test("sorting does not change the original array", () => {
  const list = getTestList();
  const originalOrder = employeeNames(list);
  const sorted = sortEmployeesBySalary(list);

  expect(employeeNames(list)).toEqual(originalOrder);
  expect(sorted[0]?.fullName).toBe("Kevin Fernando");
  expect(sorted[sorted.length - 1]?.fullName).toBe("Sarah Perera");
});

test("invalid status values are blocked by the type system", () => {
  const employee: Employee = {
    employeeId: "1002",
    fullName: "Test User",
    salary: 1000,
    // @ts-expect-error "fired" is not an allowed EmployeeStatus, so tsc should complain here
    status: "fired",
  };
  // this test is really checked by "npm run typecheck", not when it runs
  expect(employee).toBeDefined();
});

test("formatEmployeeDetails returns as a readable string", () => {
    const employee: Employee = {
    employeeId: "E1",
    fullName: "Test User",
    email: "test.user@example.com",
    salary: 3000,
    status: "active",
  };
  const formatted = formatEmployeeDetails(employee);
  expect(formatted).toBe("Employee ID: E1, Name: Test User, Email: test.user@example.com, Salary: 3000, Status: active");
});

test("formatEmployeeDetails handles missing email correctly", () => {
    const employee: Employee = {
    employeeId: "E2",
    fullName: "No Email User",
    salary: 2000,
    status: "inactive",
  };
  const formatted = formatEmployeeDetails(employee);
    expect(formatted).toBe("Employee ID: E2, Name: No Email User, Email: N/A, Salary: 2000, Status: inactive");
});

test("salary update rejects a salary of 0",  () => {
  expect(() => updateEmployeeSalary(getTestList(), "200624TS", 0)).toThrow();
});

test("Employee salary must be greater than 0", () => {
  const list = getTestList();
  expect(() => updateEmployeeSalary(list, "200624TS", -1)).toThrow("Salary must be a positive, finite number.");
  expect(() => updateEmployeeSalary(list, "200624TS", 0)).toThrow("Salary must be a positive, finite number.");
  const employee = updateEmployeeSalary(list, "200624TS", 1);
  expect(employee.salary).toBe(1);
});

test("updating the current salary with new values", () => {
  const list = getTestList();
  const employee = updateEmployeeSalary(list, "200624TS", 50000);
  expect(employee.salary).toBe(50000);
});

test("employees with equal salaries keep their original order", () => {
  const list: Employee[] = [
    { employeeId: "2", fullName: "Bob", salary: 50000, status: "active" },
    { employeeId: "1", fullName: "Alice", salary: 50000, status: "active" },
    { employeeId: "3", fullName: "Charlie", salary: 60000, status: "active" },
  ];
  const sorted = sortEmployeesBySalary(list);
  expect(sorted[0]?.fullName).toBe("Bob");
  expect(sorted[1]?.fullName).toBe("Alice");
  expect(sorted[2]?.fullName).toBe("Charlie");
});

test("returns the first employee when two employees share the same ID", () => {
  const list: Employee[] = [
    { employeeId: "E1", fullName: "First", salary: 1000, status: "active" },
    { employeeId: "E1", fullName: "Second", salary: 2000, status: "active" },
  ];
  const employee = getEmployeeById(list, "E1");
  expect(employee?.fullName).toBe("First");
});


  
