![img](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/template.svg)
# Template: API [Node.js](https://nodejs.org/pt-br/ 'Node.js')
*[Typescript](https://www.typescriptlang.org/pt/ 'Typescript') - [Prisma](https://www.prisma.io/ 'Prisma') - [PostgreSQL](https://www.postgresql.org/ 'PostgreSQL') - [Docker](https://www.docker.com/ 'Docker') - [Swagger](https://swagger.io/ 'Swagger') - [Jest](https://jestjs.io/pt-BR/ 'Jest')*

# Entre em Contato com o Desenvolvedor
<div align="center">
      <a href="https://www.linkedin.com/in/paulo-eduardo-peixoto-2155a866/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
      <a href="mailto:peixoto.pauloeduardo@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
      <a href="https://github.com/padupe" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
</div>

## Índice
- [Entre em Contato com o Desenvolvedor](#entre-em-contato-com-o-desenvolvedor)
- [MER (Modelo Entidade Relacionamento)](#mer-modelo-entidade-relacionamento)
- [Fluxo de Resposta ao Cliente](#fluxo-de-resposta-ao-cliente)
- [Dependências do Projeto](#dependências-do-projeto)
- [Ferramentas Utilizadas](#ferramentas-utilizadas)
- [Utilizando a Aplicação](#utilizando-a-aplicação)
  - [Documentação da API](#documentação-da-api)
  - [JSON para testes via Insomnia](#json-para-testes-via-insomnia)
  - [Comandos Úteis](#comandos-úteis)
    - [Docker](#docker)
    - [Aplicação](#aplicação)
    - [Banco de Dados](#banco-de-dados)
    - [Testes Automatizados](#testes-automatizados)

## MER (Modelo Entidade Relacionamento)
<div align="center">
      <img align="center" alt="MER-Template" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/mer.png">     
</div>


## Fluxo de Resposta ao Cliente
<div align="center">
      <img align="center" alt="Fluxo-Template" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/fluxo.drawio.png">     
</div>


## Dependências do Projeto
- [bcrypt](https://www.npmjs.com/package/bcrypt 'bcrypt'): Uma biblioteca para ajudá-lo a fazer hash de senhas<br>
- [dotenv](https://www.npmjs.com/package/dotenv 'dotenv'): Dotenv é um módulo de dependência zero que carrega variáveis ​​de ambiente de um arquivo `.env` para `process.env`;<br>
- [express](https://expressjs.com/pt-br/ 'express'): O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móvel;<br>
- [express-async-errors](https://www.npmjs.com/package/express-async-errors 'express-async-errors'): Um hack de suporte async/await ES6 simples para ExpressJS;<br>
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken 'jsonwebtoken'): Uma implementação de JSON Web Tokens;<br>
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata 'reflect-metadata'): Uma biblioteca que atende vários casos de uso (composição/injeção de dependência, asserções de tipo de tempo de execução, reflexão/espelhamento, teste) desejam a capacidade de adicionar metadados adicionais a uma classe de maneira consistente;<br>
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express 'swagger-ui-express'): Este módulo permite veicular documentos de API gerados automaticamente por swagger-ui do express, com base em um arquivo `swagger.json`. O resultado é uma documentação viva para sua API hospedada em seu servidor por meio de uma rota;<br>
- [tsyringe](https://www.npmjs.com/package/tsyringe 'tsyringe'): Um contêiner de injeção de dependência para TypeScript/JavaScript para injeção no construtor;<br>
- [winston](https://www.npmjs.com/package/winston 'winston'): Um registrador de logs.<br>


## Ferramentas Utilizadas
- **Banco de Dados:** PostgreSQL;<br>
- **Compilador**: [SWC](https://swc.rs/ 'SWC');<br>
- **Contêiner:** Docker;<br>
- **Criptografia:** Bcrypt;<br>
- **Documentação da API:** Swagger;<br>
- **ORM:** Prisma;<br>
- **Registro de Logs:** Winston;<br>
- **Testes:** Jest e [Supertest](https://www.npmjs.com/package/supertest 'Supertest');<br>
- **Token:** JWT.<br>


## Utilizando a Aplicação

**Requisitos**:
- Node.js >= 14.x;
- Docker;
- [Yarn](https://yarnpkg.com/ 'Yarn') >= 1.22.x;
- [Insomnia](https://insomnia.rest/ 'Insomnia') (Opcional).

**Passo a passo**
1. Clone este repositório:
      > SSH
      ```
      git clone git@github.com:padupe/template_node-ts-prisma-postgresql.git
      ```

      > HTTPS
      ```
      git clone https://github.com/padupe/template_node-ts-prisma-postgresql.git
      ```

2. Crie o arquivo `.env` na raiz do Projeto

3. Copie o código do `example.env` para o `.env`

4. Expanda o diretório **`docker`**

5. Crie o arquivo `.env`

6. Copie o código do `example.env` para o `.env` criado no diretório **`docker`**

7. Instale as dependências
```
yarn install
```

8. Suba o contêiner do Banco de Dados
```
docker-compose -f docker/docker-compose.yaml --env-file docker/.env up -d
```

9. Rode o comando para instanciar o Prisma
```
yarn prisma generate
```

10. Rode o comando para rodar as migrations
```
yarn migrate:run
```

11. Popule o Banco de Dados
```
yarn seed
```

12. Rode a Aplicação
```
yarn dev
```

### Documentação da API
[Swagger](http://localhost:3000/docs/)<br>
*IMPORTANTE:* É necessário rodar o comando `yarn dev`<br>
<div align="center">
      <img align="center" alt="Swagger" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/swagger.png">     
</div>

### JSON para testes via Insomnia
Realize o _import_ deste [arquivo](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/insomnia/Insomnia.json "arquivo") no Insomnia.

### Comandos Úteis

#### Docker
```
docker-compose -f docker/docker-compose.yaml --env-file docker/.env up -d
```

#### Aplicação

Iniciar a Aplicação
```
yarn dev
```

Reset das Migrations e Banco Populado
```
yarn migrate:reset
```

Início expresso da Aplicação
```
yarn start
```
> Todos os comandos necessários são rodados de maneira dinâmica

#### Banco de Dados

Interface visual para gerenciamento do Banco de Dados
```
yarn prisma studio
```

#### Testes Automatizados

Para rodar todos os testes
```
yarn test
```

Para verificar o coverage dos testes
```
yarn test --coverage
```
<div align="center">
      <img align="center" alt="Coverage" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/coverage.png">     
</div>
<br>

Para rodar um teste específico
```
yarn test {caminho_para_o_teste+nome_do_arquivo_com_a_extensao}
```
*Exemplo:* `yarn test src/auth/jsonwebtoken.spec.ts`<br>