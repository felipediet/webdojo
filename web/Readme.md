### Ninja do Cypress - Comandos E2E

#### Caminho do projeto local
```sh
cd /c/NinjaDoCypress/webdojo/web
```

#### Rodar o projeto WEB
```sh
npm run dev
```

#### Rodar todos os testes do Cypress
```sh
npx cypress run
```

#### Abrir a interface UI do Cypress
```sh
npx cypress open
```

#### Rodar apenas os testes de Login
```sh
npx cypress run --spec cypress/e2e/login.cy.js

npm run test:login
```

#### Rodar os testes de Login em dispositivos móveis
```sh
npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=360,viewportHeight=760

npm run test:login:mobile
```




