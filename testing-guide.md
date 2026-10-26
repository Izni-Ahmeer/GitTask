# Testing Guide

**Vitest**

this tool is used in order to auto check if the written code is working correctly, this starts off by creating small test cases inside a file for the corresponding function, this will include expected or to be values. this tool will then run the test cases and return if any of the code is broken.

## Testing Framework and Setup

before starting the testing process, you start with installing vitest and the coverage tool on your folder by running `npm install -D vitest @vitest/coverage-v8` on your terminal. if you cloned this project, they are already listed in `package.json`, so just running `npm install` is enough.

the code file is - src/employee.ts

testing file is - src/employee.test.ts

the rules and setting file - vitest.config.ts 

this file has all the set of rules the testing will follow, vitest reads it automatically every time the tests run. the rules are:

## Running the Tests

**npm test/npm run test**

this runs all the test cases inside the test file and shows which test cases pass and fail depending on the expectation.

**npm run coverage**

this will also run the tests but also shows how much of the code was tested, in a table of statistics based on the test run. after running it, you can open `coverage/index.html` in a browser to see the tested lines in green and untested lines in red.

**npm run typecheck**

this command is used to find type errors, this also checks the invalid status test, since that one is checked by typescript and not when the tests run.

**npm run lint**

this command is used to check the code for mistakes and bad habits without running it, kind of like a spell checker for code. it catches things like unused variables or functions, leftover code and using `any`.

## How the Tests Work

**Arrange, Act, Assert**

each test is written in 3 steps. first you arrange, which means preparing the input data, then you act, which means calling the function you want to test, and then you assert, which means using `expect` to check if the result is what it should be. for example:

```ts
test("annual salary is calculated correctly", () => {
  const result = calculateAnnualSalary(5000);
  expect(result).toBe(60000);
});
```

here 5000 is the input, `calculateAnnualSalary` is the function being called, and `expect` checks that the answer is 60000. if the answer is anything else, the test fails.

**getTestList()**

some functions like `updateEmployeeSalary` change the employee data, so if all the tests used the same list, one test could change a salary and break the other tests. to stop this, `getTestList()` uses `map` and the spread operator to make a fresh copy of every employee each time it's called, so every test gets its own copy and the tests don't depend on each other or the order they run in.

**own test data inside tests**

for some tests the sample employees didn't have the situation i needed to test, like two employees with the same salary, two employees with the same ID, or a number only ID. for those tests i created a small list of fake employees inside the test itself, this also makes the test easier to read since the input and the expected result are in the same place.

## Test Summary

there are 24 tests in total, split into positive, negative and edge case tests.

### Positive Tests

these check that the functions work correctly when given normal input.

| Test | What it checks |
|---|---|
| employee can be found using a valid ID | finds the right employee using their ID |
| active employees are filtered correctly | only gives back employees with "active" status |
| annual salary is calculated correctly | 5000 a month gives 60000 a year |
| salary update accepts a valid value | the salary changes to the new value |
| email is returned when the employee has one | gives back the employee's email |
| string employee IDs are handled correctly | removes spaces and still finds the employee |
| numeric employee IDs are handled correctly | a number ID also finds the employee |
| sorting does not change the original array | sorts lowest to highest salary and the original list stays the same |
| formatEmployeeDetails returns as a readable string | turns the employee into the right line of text |
| total monthly salary adds up every employee's salary | adds up all the salaries to 367000 |

### Negative Tests

these check that wrong or invalid input gets rejected instead of breaking the code.

| Test | What it checks |
|---|---|
| unknown employee ID returns undefined | an ID that doesn't exist gives back undefined |
| salary update throws when the employee does not exist | updating a missing employee throws a error |
| negative salary is rejected | a salary below 0 throws a error |
| NaN and infinite salary values are rejected | NaN and Infinity throw a error |
| throws an error when fetching an email with an empty ID | an empty or unknown ID throws a error |
| invalid status values are blocked by the type system | typescript doesn't allow a status like "fired" |

## Coverage Results

PS F:\GitTask> npm run coverage

> gittask@1.0.0 coverage
> vitest run --coverage

 RUN  v5.0.5 F:/GitTask
      Coverage enabled with v8

 ✓ src/employee.test.ts (23 tests) 13ms

   ✓ employee can be found using a valid ID 3ms

   ✓ unknown employee ID returns undefined 0ms

   ✓ active employees are filtered correctly 1ms

   ✓ annual salary is calculated correctly 0ms

   ✓ salary update throws when the employee does not exist 1ms

   ✓ negative salary is rejected 0ms

   ✓ NaN and infinite salary values are rejected 0ms

   ✓ empty employee arrays are handled correctly 1ms

   ✓ missing email address is handled correctly 0ms

   ✓ email is returned when the employee has one 0ms

   ✓ string employee IDs are handled correctly 0ms

   ✓ numeric employee IDs are handled correctly 0ms

   ✓ sorting does not change the original array 1ms

   ✓ invalid status values are blocked by the type system 0ms

   ✓ formatEmployeeDetails returns as a readable string 0ms

   ✓ formatEmployeeDetails handles missing email correctly 0ms

   ✓ salary update rejects a salary of 0 0ms

   ✓ Employee salary must be greater than 0 0ms

   ✓ updating the current salary with new values 0ms

   ✓ employees with equal salaries keep their original order 0ms

   ✓ returns the first employee when two employees share the same ID 0ms

   ✓ throws an error when fetching an email with an empty ID 0ms

   ✓ total monthly salary adds up every employee's salary 0ms


 Test Files  1 passed (1)

      Tests  23 passed (23)

   Start at  20:34:05

   Duration  283ms (worker 37%, import 26%, tests 19%, transform 17%)


 % Coverage report from v8

No files with missing coverage.

1 file fully covered.

-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------|---------|----------|---------|---------|-------------------
All files    |     100 |      100 |     100 |     100 |                   
 employee.ts |     100 |      100 |     100 |     100 |                   
-------------|---------|----------|---------|---------|-------------------

## Known Limitations and Skipped Tests

No tests were skipped from test cases.

**Limitations**

The duplicate ID aren't checked, none of the test cases ensures that all the ID's are unique to a single user.

Decimal values of salary are allowed, when an employee has 0.5, the test cases just pass it because it has a higher value than 0.

there were no integration testing, only unit tests.
