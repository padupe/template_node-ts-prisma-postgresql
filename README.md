![img](https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/template.svg)
# Template: API Node.js
*Typescript - Prisma - PostgreSQL - Docker - Swagger - Jest*

## MER (Modelo Entidade Relacionamento)
<div align="center">
      <img align="center" alt="MER-Template" src="https://github.com/padupe/template_node-ts-prisma-postgresql/blob/master/images/mer.png">     
</div>


## Utilizando a Aplicação

**Requisitos**:
- Node.js >= 14.x;
- Docker;
- Yarn >= 1.22.x
- Insomnia (Opcional)

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
*IMPORTANTE:* É necessário rodar o comando `yarn dev`

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

#### Banco de Dados

Interface visual para gerenciamento do Banco de Dados:
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

Para rodar um teste específico
```
yarn test {path_to_test+extension_file}
```
*Exemplo:* `yarn test src/auth/jsonwebtoken.spec.ts`