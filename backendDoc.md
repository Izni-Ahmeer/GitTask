## Folder Structure

## A Request's Journey

**How backend handles frontend requests**

When it comes to the frontend requesting for something, this request will go through 3 different main files.

Router -> Handler -> Service -> Database

**Router**

When a request to get client 5 arrives (`GET /clients/5`), the router finds which handler should deal with it.

src/modules/client/clients.router.ts#L100-L105

this set of lines will try and match the clientID then check if it's a number. this will also check if the user has the relevant permission to view clients. afterwards it will send this request to the handler.

**Handler**

this handler will read the request and ask the relevant service for the client.

src/modules/client/client-get.ts#L20-L43

These lines will first get the context, which holds the tenant and the database connection, and read any extra options from the URL. It will then create the services it needs and ask the client service for client 5 using the client ID from the URL. If the request asks for a template (`?template=true`), it will also get extra details like dropdown options and the client's savings accounts, and add them on top of the client data. Afterwards it will return the client, which gets sent back to the frontend.

**Service**

This service will run the SQL query on the database and return the client.

src/modules/client/service/ClientReadPlatformService.ts#L993-L1017

These lines will build a SQL query to find the client by its ID, but only if the client belongs to an office the user is allowed to see. It will then run the query through the database connection from the context. After that it will also get the groups the client belongs to and add them to the client data. If the client is not found, it will throw a `ClientNotFoundException`, which sends a 404 back to the frontend.

## Context & Database Queries

Every request that gets sent over gets a context box that carries everything the request needs.

for example in "src/common/context.ts#L17-L31", tenantId means which database to use, authenticatedUser is which user logged in, permissions is what that user's role is allowed to do and queryRunner is what lets us run db queries. the way the handler gets this context is by `const context = Context.fromRequest(req)`. this will then pick up the context that was made for this request, and if there isn't one, this will throw an error. this scenario will happen only if someone forgets to wrap the route in `requestHandler`.

**how does the context and the connection form**

Whenever a request comes in, there are 3 things that happen. It starts off with the tenant being read, where the backend checks which company this request is for using the `fineract-platform-tenantid` header "src/modules/auth/authService.ts#L70-L71". If there's no tenant, it throws a `TenantIdNotFoundException`. Next, the context is made, which holds the company, the logged-in user and their permissions "src/modules/auth/authService.ts#L149-L155". Lastly, requestHandler opens a connection to that company's database and adds it to the context as queryRunner "src/common/requestHandler.ts#L56-L67". After this, the handler can get the context using `Context.fromRequest(req)` and run queries with `context.queryRunner.query(...)`.

**running a query**

when it comes to running a query, this system runs them through context connections `await this.context.queryRunner.query('SELECT * FROM m_client WHERE id = ?', [clientId])` and when running a query, it should always be queryRunner with only raw sql and never use typeORM functions like `repo.find()` or `repo.save()`.

**saving**

after the handler finishes everything, the requestHandler decides: if there are no errors, it will commit the changes, and if there are errors, it will undo all the changes. both will lead to closing the connection.

## Migrations

**what is**

this is a file that is able to change the database. the reason for using migrations is so every database (local, QA and live) will get the same changes in the same order, without anyone needing to change it by hand.

**used in**

Example: Recovery table

a migration creates a new table called "r_recovery_config_accounts", which stores which accounting accounts the recovery module should use.

**the flow of migration**

1. start off with `up()` which is used to create the table with columns and links this table to other tables "src/migrations/recovery/1786899576941-CreateRecoveryConfigAccountsTable.ts#L4-L23". `down()` is used to delete the table if the changes need to be undone "src/migrations/recovery/1786899576941-CreateRecoveryConfigAccountsTable.ts#L25-L27"

2. after writing the migration, next step is exporting the file, and without exporting, this migration is never found "src/migrations/recovery/index.ts#L13".

3. after the previous step, this folder is then added to the main list "src/migrations.ts#L41".

4. After adding it to the main list, you run the migration using `npm run db:migrate`. This loads the main list of migrations "src/common/typeorm.cli.config.ts#L4-L11", then checks which migrations have already run, runs `up()` for the new ones, and records them so they never run twice.

5. Once the table is created, an entity is used to describe the table so TypeScript knows what columns it has "src/entities/RecoveryConfigAccount.ts#L17". The entity is only for types and doesn't create anything.

6. Finally, the module can now use the table. In this example, the recovery module deletes the old rows "src/modules/recovery/configuration/create.ts#L119" and saves the new ones "src/modules/recovery/configuration/create.ts#L141".

## Error Handling

**rule**

"Don't catch errors yourself. Just throw the right one" this error handling system will send the relevant response to the frontend.

**flow of error handling**

1. *Service receives request, if the condition to throw an error is right, it throws an error -> ClientNotFoundException*

this service will throw an error when there isn't a client "src/modules/client/service/ClientReadPlatformService.ts#L1015"

the error class only holds the error code and message, and it extends a base "not found" error which decides the status code "src/modules/client/exception/ClientNotFoundException.ts#L3-L7"

2. *request handler catches it -> undoes database changes (a rollback)*

the requestHandler catches the error, undoes all the database changes, closes the connection, and passes the error on using `next(error)` "src/common/requestHandler.ts#L189-L216"

3. *createRouter checks its type -> "it's a not-found error"*

createRouter checks what type of error it is "src/common/createRouter.ts#L43". since it's a not-found error, it picks the not-found mapper "src/common/createRouter.ts#L84-L88"

4. *the mapper builds the relevant response -> 404 + error JSON*

the mapper builds the response and sends it to the frontend with a 404 status and the error JSON "src/infrastructure/core/exceptionMapper/PlatformResourceNotFoundExceptionMapper.ts#L13"

## Tech Stack

**main core**

this fused-backend is built with node.js, express and typescript, and runs on bun when developing locally. express is used in this backend because it is what helps match each URL to the correct code. the main database is MySQL, and each company gets its own database "src/common/typeorm.config.ts#L14-L23". in this instance typeORM is only used for entities and migrations, it is never used to run sql queries.

**S3**

this is the main AWS storage for files like documents, images and report exports "src/common/s3Helpers.ts". it also has different functions like uploading a file "src/common/s3Helpers.ts#L16", downloading a file "src/common/s3Helpers.ts#L65" and making a temporary download link "src/common/s3Helpers.ts#L144". this can be seen in the reconciliation module to upload a file "src/modules/recon/get-reconciliation.ts#L134".

**SQS (message queue)**

this is a to-do list for other systems. the backend does this by dropping a message into the queue using `SQS.enqueue` "src/common/sqs.ts#L12-L30", and then another system picks this up and does the heavy work later. in fused, this is being used for big reports "src/modules/quickreports/generate-report.ts#L165" and another being ML predictions "src/modules/predictions/predictionRequest.ts#L7". this repo only sends messages and never reads them.

**OpenSearch (search)**

this functionality is a search engine that is used for fast search "src/common/openSearch.ts#L3-L11". in this instance, it is only used for searching app users.

**Socket.IO (live messages)**

this lets the backend push updates instantly without needing the page to ask "src/common/initializeSocketIO.ts#L8-L42". each user joins their own room called `user-<id>` and then the backend sends a message to that room. one example of this is the notifications that are sent "src/modules/notifications/service.ts#L37-L38".

**RisingWave (report database)**

RisingWave is a separate database for heavy reports, so they don't slow down MySQL "src/common/risingwave.ts#L5-L18". queries run through `runRisingWaveQuery(...)`, for example in the center leader reports "src/modules/centerleader/service/CenterLeaderProgramReadPlatformService.ts#L591".

## Redis

**what is**

this is a super fast storage that is able to keep data in memory instead of on the disk. this is used mainly for data that gets read a lot, so that the backend doesn't have to ask the database every time it needs data "src/common/redis.ts"

the codes service uses `@Cacheable` so that the list of codes is only read from the database once, and afterwards comes from redis "src/infrastructure/codes/service/CodeReadPlatformService.ts#L30-L31"

**flow of redis**

the method is first called -> then it builds the cache key "src/common/redis.ts#L136" -> this will then check redis and see if the key exists there "src/common/redis.ts#L141". if the key is saved in the cache, it will return it straight away "src/common/redis.ts#L143-L149". (if the key isn't found, which is a cache miss -> it will run the real method, which reads from the database since the key doesn't exist in the redis cache "src/common/redis.ts#L152".) -> after a cache miss, it will save the result in redis for a short period of time, 1 hour by default "src/common/redis.ts#L153", "src/common/redis.ts#L12", so the next call can get it from the cache.

## Auth & Permissions

**what is**

authentication is what checks who you are (the login) and the permissions check what this user is allowed to do. every request the user makes has to pass both checks before it reaches the handler.

**flow of logging in as a user**

user starts by sending the username and password -> then the login handler reads the request "src/modules/auth/login.ts#L185-L186", afterwards it checks the password to see if it's correct "src/modules/auth/login.ts#L192" -> if it is, and the user is logging in from the web and has a mobile linked to the account, it will send an OTP by SMS before giving the token "src/modules/auth/login.ts#L195-L200". this OTP is saved in redis for 5 minutes before it expires "src/modules/auth/login.ts#L20". -> after the checkup is completed, it gets the user's permissions "src/modules/auth/login.ts#L154" and creates a JWT token "src/modules/auth/login.ts#L159". -> this then saves the token in redis for the time set in `AUTH_TOKEN_EXPIRES_IN` "src/modules/auth/login.ts#L161-L169" and sends it back to the frontend.

*flow after login*

the frontend sends the token with every request -> the token is checked to make sure it's real "src/modules/auth/authService.ts#L129" -> then it's compared with the one in redis to make sure it's the latest one "src/modules/auth/authService.ts#L133-L139" -> if it is, it checks the user has the permission the route needs "src/modules/auth/authService.ts#L157". if they do, the request moves on to the handler, and if not, it sends a 403.

## Maker-Checker

**what is**

this is an important functionality that gives the system the ability to have approval before it's completely saved. one person (maker) submits an action, like creating a client, and another person (checker) with the right permission has the ability to either approve or reject the request before it's saved in the database.

this applies only if maker-checker is turned on for the whole company and turned on for that specific action.

**flow of the maker-checker**

the maker sends an action, like creating a client "src/modules/client/create-client.ts#L11-L19" -> if maker-checker is on, the action isn't saved yet, it's put in a pending list "src/commands/services/SynchronousCommandProcessingService.ts#L95-L101" -> the checker sees it and approves it "src/modules/makercheckers/router.ts#L18-L22" -> after approval, the action is saved for real "src/commands/services/PortfolioCommandSourceWritePlatformService.ts#L198-L199".

## Tests

**what is**

tests check that the code works the way it should. all the tests run on Jest, and they live in the `tests/` folder, never in `src/`.

*e2e tests*

e2e tests check a real API endpoint over HTTP, so the server needs to be running. they live in `tests/e2e/`, with one folder per area like client and loans. most of them ask both Fineract and our backend the same thing and check the answers match "tests/e2e/client/endpoints/client-charges-routes.test.ts#L57-L66". Fineract's answers are recorded in `__fineract__` files, so a live Fineract server isn't needed.

*flow of running e2e tests*

set up the test database once with `npm run test:db` "package.json#L7" -> start the test server with `npm run test:e2e:server` "package.json#L34" -> in another terminal, run the tests for one area, like `npm run test:e2e:client` "package.json#L14".
