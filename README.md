![img](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/template.svg)
# Template: API Node.js
*Typescript - Prisma - PostgreSQL - Docker - Swagger - Jest*

> Check the Documentation in pt-br by clicking [here](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/docs/README-pt-br.md 'here').

## ERM (Entity Relationship Model)
<div align="center">
      <img align="center" alt="MER-Template" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/mer.png">     
</div>


## Customer Response Flow
<div align="center">
      <img align="center" alt="Fluxo-Template" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/fluxo.drawio.png">     
</div>


## Using the Application

**Requirements**:
- Node.js >= 14.x;
- Docker;
- Yarn >= 1.22.x
- Insomnia (Opcional)

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