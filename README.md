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
  - `guards`: Guards are responsible for ensuring that certain conditions are met before a route is accessed.
  - `strategies`: Strategies define various authentication mechanisms for our application.
- `infrastructure-usecases-bridge`: Acts as a bridge between our core logic and infrastructure, allowing for decoupling where needed.

## Guards

The guards in this project are used to protect routes and ensure that only authenticated users with the appropriate roles can access certain functionalities.

- `JwtAuthGuard`: Ensures that a route is only accessible to authenticated users with a valid JWT.
- `RolesGuard`: Checks that the authenticated user has the required role to access a particular route.

## Strategies

Authentication strategies are crucial for our application's security, defining how authentication is performed.

- `LocalStrategy`: Used for standard username and password authentication.
- `JwtStrategy`: Utilized for JWT token verification post-login.

## Bridge Module

The `infrastructure-usecases-bridge` module is central to the interaction between our use cases and infrastructure layers. It provides a proxy mechanism (`UsecaseProxy`) which facilitates the use of use case classes within the infrastructure layer, maintaining the separation of concerns as dictated by Clean Architecture.

## Testing

Testing is an integral part of our development process. We follow an end-to-end testing approach to ensure that each component works as expected in a real-world scenario.

- `e2e`: Contains our end-to-end tests.
  - `cats`: Tests for the cat-related functionalities and routes.
  - `user`: Tests for user authentication and management.

## Technology Summary
1. Framework: NestJS, a framework for building efficient and scalable server-side applications. It leverages TypeScript and provides out-of-the-box application architecture which allows developers to maintain scalable and testable code.
2. Database: PostgreSQL, an open-source relational database that provides robust features to handle complex data workloads and ensures data integrity.
3. ORM (Object-Relational Mapping): TypeORM, an ORM that can run in Node.js, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). It supports the Active Record and Data Mapper patterns.
4. Authentication: PassportJS, a middleware for Node.js that simplifies the process of handling authentication. It supports a wide range of strategies including username and password, Facebook, Google, and more.

## Follow the given steps to setup application locally

1. Create .env file and set values of each property given in .env.sample
2. Install dependancy 
  - yarn install
3. Run migration (ensure that postgres is up and running)
  - yarn run migration-start
4. Run Server
  - yarn start


## Follow the given step to setup application for production

1. Install Docker
2. Execute following commands
  - docker-compose up
3. Run migration
  - yarn run migration-start 


## Test

```bash
# e2e tests
$ npm run test:e2e

```

