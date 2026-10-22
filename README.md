***Project Overview***

A small Employee Management Utility built in TypeScript, without any frontend or backend framework. It focuses on writing type-safe, reusable, and readable code while following professional coding standards.

## Setup and Execution

### Prerequisites / Installation / Compiling the Project / Running the Project

Installing the packages (`npm install`), type checking (`npm run typecheck`) and linting (`npm run lint`)

## TypeScript Concepts Used

**Type Inference**

typescript is able to automatically figure out the type of a value by itself, if i write `const salary = 5000;` typescript is able to figure out its a number, so it makes it unnecessary to manually define a type.

**const** / **let**

`const` is used when you want to create a value that never changes, and `let` is used in if you want to reassign a different value later.

**Interfaces**

the interface is basically a blueprint or structure for a object, this blueprint will list all the properties like (ID, Name, Salary, Status) in the employee interface, so when defining these properties, typescript will warn me if i miss any properties or use a wrong type.

**Optional Properties**

in order to create a optional property, adding `?` means it allows the value of that property to be missing. this means that some employees might not have any email or department values, basically making them optional.

### Type Aliases and Union Types

A type alias is a name for a type. Instead of writing the same type over and over, I give it a name using the `type` keyword and just use that name whenever it's needed. Using `|` means "or", so I can limit a value to a fixed set of options, like `"active" | "inactive"`.

### Parameter and Return Types

each every mentioned function says what it takes and what it returns. a instance of this is when `calculateAnnualSalary(monthlySalary: number): number` takes a number and returns a number.

### Array Methods

there are times when instead of using loops which take extra code, using these array methods that are designed for certain situation allows us to utilize them.

**find()** 

this array method is used when you want to find the first employee that matches the exact conditions.

**filter()**

this array method is used when you want to filter out results based on the conditions set for them.

**map** 

this array method is used when you want to take every item in a list and turn it into something else, and it gives back a new list with the same number of items. i used it to turn the list of employees into a list of just their names, so the original list doesn't get changed.


**reduce** 

this array method is used when you want to keep adding values onto a current value progressively and get a final total after the final value is adding onto the rest of the value

**sort**

`sort` puts items in order. I used it to sort employees by salary, from lowest to highest. I sorted a copy (`[...list]`) spread op, instead of the original, because `sort` changes the list it's used on.

### Type Narrowing

there are instances where the value can differ from string to number, by using `typeof` in order to check the type and since typescript knows what the exact type it is, we are safely able to use methods like trim() that would only work with strings.

### Nullish Coalescing (??)

this is a method that is used for instance, email ?? meaning if there is a email, it will use it. but if there isn't or missing it will use a backup message.

### Error Handling

when a entered input is invalid (empty fields or unknown ID), the function will throw a error in order to stop operations and explain why this happened with a small message.

### Strict Mode

this rule is switched on in the tsconfig.json file because it is able to do better checks for any mistakes or errors that are caught before the code is ever run.

## Implemented Functions

### getEmployeeById

this function is used in order to go through the object array and gives the first employee that matches the specific employeeId, and if there isn't a employee with that Id, it will give back undefined.

### getActiveEmployees

this function checks the object array to see if there is any employees with the "active" status and returns them as a new list.

### calculateAnnualSalary

this function takes the monthly salary of the employees and multiplies it by 12 months in order to display the annual salary.

### updateEmployeeSalary

this function checks if the new salary is a positive number as well as rejecting any NaN, infinity and negatives, then it will find the employees current salary and make changes. if the salary is invalid or this specific employee doesn't exist, it will automatically throw a error.

### formatEmployeeDetails

this function will take a employees information and turn them into readable lines of text with their Id, Name, Email, Salary, and status. if they don't have a email it will show as N/A.

### employeeNames

this function is added in order to list all the employees names only, by using `map`.

### calculateTotalMonthlySalary

this function uses `reduce()` array method to add up every employees salary for the month, this starts with value 0, if there isn't any value in the object array, it will return 0.

### sortEmployeesBySalary

this function works by `[...list]` will create a copy of the list and then `sort()` to sort the copy from lowest to highest salary, this also doesn't change the original list.

### findEmployeeByAnyId

this function accepts the employee ID as either a string or a number. it uses `typeof` to check which one it is, if its a string it will remove any spaces with `trim()` and checks that it only has letters and numbers. if its a number it checks that its a positive whole number and then turns it into a string. after that it uses `getEmployeeById` to find the employee, and if the ID is invalid it will throw a error.

### fetchEmployeeEmailByID

this function first checks that the employee ID isn't empty, then it uses `getEmployeeById` to find the employee and gives back their email. if the employee doesn't have a email, `??` is used to give back a backup message instead. if the ID is empty or the employee doesn't exist, it will throw a error.

## Examples of Expected Behavior
### Valid Inputs
### Invalid Inputs

## Validation and Error Handling

### Input Validation

before any changes or searches happen, the input gets checked first so nothing wrong gets through.

- **salary** (`updateEmployeeSalary`) - the new salary has to be a positive number. `Number.isFinite()` is used so NaN, Infinity and -Infinity get rejected, and anything that is 0 or below is also rejected.
- **string ID** (`findEmployeeByAnyId`) - spaces get removed with `trim()` first, then it checks the ID only has letters and numbers, so things like "200-624" or an empty string get rejected.
- **number ID** (`findEmployeeByAnyId`) - it has to be a positive whole number, so things like -5, 1.5 or NaN get rejected.
- **empty ID** (`fetchEmployeeEmailByID`) - an empty ID gets rejected before it even searches the list.

### Error Handling Approach

i chose to always `throw` a `Error` when the input is invalid, instead of ignoring it or returning a random value, because that way the mistake gets noticed straight away and the message explains what went wrong.

but just searching for a employee that doesn't exist (`getEmployeeById`, `findEmployeeByAnyId`) isn't really a mistake, so those return `undefined` instead of throwing, and whoever calls the function can decide what to do with it.

for things that are optional like the email, a missing value isn't a error either, so `??` is used to give a backup value instead.

### Error Messages

| Function | When | Message |
|---|---|---|
| `updateEmployeeSalary` | salary is 0, negative, NaN or Infinity | "Salary must be a positive, finite number." |
| `updateEmployeeSalary` | employee ID doesn't exist | "Employee not found." |
| `findEmployeeByAnyId` | string ID has symbols or is empty | "Employee ID must be alphanumeric." |
| `findEmployeeByAnyId` | number ID isn't a positive whole number | "Employee ID must be a positive whole number." |
| `fetchEmployeeEmailByID` | ID is an empty string | "Employee ID cannot be empty." |
| `fetchEmployeeEmailByID` | employee ID doesn't exist | "Employee ID not found. Try again with a valid ID." |
