***Project Overview***

A small Employee Management Utility built in TypeScript, without any frontend or backend framework. It focuses on writing type-safe, reusable, and readable code while following professional coding standards.

## Setup and Execution

### Prerequisites / Installation / Compiling the Project / Running the Project

Installing npm (npm install), type checking (npx tsc --noEmit), linting (npx eslint) and running the tests (npx tsx src/test.ts)

## TypeScript Concepts Used

**Type Interface**

typescript is able to automatically figure out the type of a value by itself, if i write `const salary = 5000;` typescript is able to figure out its a number, so it makes it unnecessary to manually define a type.

**const** / **let**

`const` is used when you want to create a value that never changes, and `let` is used in if you want to reassign a different value later.

**Interfaces**

the interface is basically a blueprint or structure for a object, this blueprint will list all the properties like (ID, Name, Salary, Status) in the employee interface, so when defining these properties, typescript will warm me if i miss any properties or use a wrong type.

**Optional Properties**

in order to create a optional property, adding `?` means it allows the value of that property to be missing. this means that some employees might not have any email or department values, basically making them optional.

### Type Aliases and Union Types

A type alias is a name for a type. Instead of writing the same type over and over, I give it a name using the `type` keyword and just use that name whenever it's needed. Using `|` means "or", so I can limit a value to a fixed set of options, like "loading" | "success" | "error".

### Parameter and Return Types

each every mentioned function says what it takes and what it returns. a instance of this is when `calculateAnnualSalary(monthlySalary: number): number` takes a number and returns a number.

### Array Methods

there are times when instead of using loops which take extra code, using these array methods that are designed for certain situation allows us to utilize them.

**find()** 

this array method is used when you want to find the first employee that matches the exact conditions.

**filter()**

this array method is used when you want to filter out results based on the conditions set for them.

**map** 



**reduce** 

this array method is used when you want to keep adding values onto a current value progressively and get a final total after the final value is adding onto the rest of the value

**sort**

`sort` puts items in order. I used it to sort employees by salary, from lowest to highest. I sorted a copy (`[...list]`) spread op, instead of the original, because `sort` changes the list it's used on.

### Type Narrowing
### Nullish Coalescing (??)
### Error Handling
### Strict Mode

## Implemented Functions
### functionName1
### functionName2
### (one subheading per function)

## Examples of Expected Behavior
### Valid Inputs
### Invalid Inputs

## Validation and Error Handling
### Input Validation
### Error Handling Approach
### Error Messages