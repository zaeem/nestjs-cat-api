# Project Name

## Introduction
This project is structured based on Clean Architecture principles to ensure that our software is easy to maintain, test, and independent of UI, database, and external agency frameworks. The core focus of this architecture is to provide developers with a way to organize code in a modular fashion, allowing for isolated development, testing, and maintenance of each component.

## Architecture Overview

Clean Architecture is divided into several layers:

- **Entities**: These are the enterprise-wide business rules.
- **Use Cases**: These contain application-specific business rules.
- **Interface Adapters**: These convert data from the format most convenient for use cases and entities to the format most convenient for some external agency such as a database or the web.
- **Frameworks and Drivers**: This is where all the details go. The web is a detail, the database is a detail.

## Project Structure

The following is an outline of the project's directory structure, highlighting key components:

- `domain`: Contains the entities and use cases which are the high-level business rules of the application.
- `infrastructure`: Frameworks, drivers, and tools that support the application. The details of the application.
  - `guards`: Responsible for ensuring that certain conditions are met before a route is accessed.
  - `strategies`: Strategies define various authentication mechanisms for our application.
  - `presentation`: Responsible to provide entry point of the application.
  - `orm`: Responsible to main ORM configurations and database access.
  - `services`: Responsible to maintain 3rd party packages utilities.
  - `config`: Resposible to manage and initialise configurations.
- `infrastructure-usecases-bridge`: Acts as a bridge between our core logic and infrastructure, allowing for decoupling where needed.

## Technology Summary
1. Framework: NestJS (v10.2.1)
2. Database: PostgreSQL (v14)
4. Packages: Passport, PassportJWT, TypeORM, ClassTransformer, ClassValidator, Bcrypt and NestJS dependencies 

## Run Application Locally

### Manually

1. Download PostrgeSQL
2. Rename .env-sample file to .env and set values of each property (as per your config).
3. Install dependancy 
```bash
  $ yarn install
```
4. Run migration (ensure that postgres is up and running)
```bash
  $ yarn run migration-start
```
5. Run Server
```bash
  $ yarn start
```

### Using Docker

1. Install Docker
2. Rename .env-sample file to .env and set values of each property.
3. Change env `DATABASE_HOST` to `nestjs-database`
4. Execute following commands
```bash
  $ docker-compose up
```
5. Run migration (in docker shell)
  - Access the shell first
```bash
    $ docker exec -it nestjs-api /bin/sh
```
  - Run migration command in the shell
```bash
  $ yarn run migration-start
```


## Test
Testing is an integral part of our development process. We follow an end-to-end testing approach to ensure that each component works as expected in a real-world scenario.

- `e2e`: Contains our end-to-end tests.
  - `cats`: Tests for the cat-related functionalities and routes.
  - `user`: Tests for user authentication and management.

### Manually
```bash
# e2e tests
$ yarn run test:e2e
```

### Using Docker
- Access the shell first
```bash
  $ docker exec -it nestjs-api /bin/sh
```
  - Run tests
```bash
  $  yarn run test:e2e
```