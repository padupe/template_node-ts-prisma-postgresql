![img](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/template.svg)
# Template: API [Node.js](https://nodejs.org/en/ 'Node.js')
*[Typescript](https://www.typescriptlang.org/ 'Typescript') - [Prisma](https://www.prisma.io/ 'Prisma') - [PostgreSQL](https://www.postgresql.org/ 'PostgreSQL') - [Docker](https://www.docker.com/ 'Docker') - [Swagger](https://swagger.io/ 'Swagger') - [Jest](https://jestjs.io/ 'Jest')*

# Contact the Developer
<div align="center">
      <a href="https://www.linkedin.com/in/paulo-eduardo-peixoto-2155a866/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
      <a href="mailto:peixoto.pauloeduardo@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
      <a href="https://github.com/padupe" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
</div>


> Check the Documentation in pt-br by clicking [here](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/docs/README-pt-br.md 'here').

## ERM (Entity Relationship Model)
<div align="center">
      <img align="center" alt="Template-ERM" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/mer.png">     
</div>


## Customer Response Flow
<div align="center">
      <img align="center" alt="Template-Flow" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/fluxo.drawio.png">     
</div>


## Project Dependencies
- [bcrypt](https://www.npmjs.com/package/bcrypt 'bcrypt'): A library to help you hash passwords;<br>
- [dotenv](https://www.npmjs.com/package/dotenv 'dotenv'): Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`;<br>
- [express](https://expressjs.com/ 'express'): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications;<br>
- [express-async-errors](https://www.npmjs.com/package/express-async-errors 'express-async-errors'): A simple ES6 async/await support hack for ExpressJS;<br>
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken 'jsonwebtoken'): An implementation of JSON Web Tokens;<br>
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata 'reflect-metadata'): A library that serves multiple use cases (dependency composition/injection, runtime type assertions, reflection/mirroring, testing) wants the ability to add additional metadata to a class in a consistent way;<br>
- [swagger-ui-express]( 'swagger-ui-express'): This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a `swagger.json` file. The result is living documentation for your API hosted from your API server via a route;<br>
- [tsyringe](https://www.npmjs.com/package/tsyringe 'tsyringe'): A lightweight dependency injection container for TypeScript/JavaScript for constructor injection;<br>
- [winston](https://www.npmjs.com/package/winston 'winston'): A log logger.<br>


## Tools Used
- **API Documentation:** Swagger;<br>
- **Compiler**: [SWC](https://swc.rs/ 'SWC');<br>
- **Container:** Docker;<br>
- **Crypto:** Bcrypt;<br>
- **Logger:** Winston;<br>
- **ORM:** Prisma;<br>
- **Tests:** Jest and [Supertest](https://www.npmjs.com/package/supertest 'Supertest');<br>
- **Token:** JWT.<br>


## Using the Application

**Requirements**:
- Node.js >= 14.x;
- Docker;
- [Yarn](https://yarnpkg.com/ 'Yarn') >= 1.22.x
- [Insomnia](https://insomnia.rest/ 'Insomnia') (Opcional)

**Step by step**
1. Clone this repository:
      > SSH
      ```
      git clone git@github.com:padupe/template_node-ts-prisma-postgresql.git
      ```

      > HTTPS
      ```
      git clone https://github.com/padupe/template_node-ts-prisma-postgresql.git
      ```

2. Create the `.env` file in the Project root

3. Copy the code from `example.env` to `.env`

4. Expand the **`docker`** directory

5. Create the `.env` file

6. Copy the code from the `example.env` to the `.env` created in the **`docker`** directory

7. Install dependencies
```
yarn install
```

8. Upload the Database container
```
docker-compose -f docker/docker-compose.yaml --env-file docker/.env up -d
```

9. Run the command to instantiate Prisma
```
yarn prisma generate
```

10. Run the command to run the migrations
```
yarn migrate:run
```

11. Populate the Database
```
yarn seed
```

12. Run the Application
```
yarn dev
```

### API Documentation
[Swagger](http://localhost:3000/docs/)<br>
*IMPORTANT:* It is necessary to run the command `yarn dev`<br>
<div align="center">
      <img align="center" alt="Swagger" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/swagger.png">     
</div>

### JSON for testing via Insomnia
Import this [file](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/insomnia/Insomnia.json "file") into Insomnia.

### Useful Commands

#### Docker
```
docker-compose -f docker/docker-compose.yaml --env-file docker/.env up -d
```

#### Application

Start Application
```
yarn dev
```

Reset of Migrations and Populated Database
```
yarn migrate:reset
```

Express Start of the Application
```
yarn start
```
> All necessary commands are dynamically run

#### Database

Visual interface for managing the Database:
```
yarn prisma studio
```

#### Automated Tests

To run all tests
```
yarn test
```

To check test coverage
```
yarn test --coverage
```
<div align="center">
      <img align="center" alt="Coverage" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/coverage.png">     
</div>
<br>

To run a specific test
```
yarn test {path_to_test+file_name_whit_extension}
```
*Example:* `yarn test src/auth/jsonwebtoken.spec.ts`<br>