# 📘 Documentação de Testes Automatizados – WebDojo (Cypress)

## 📁 Estrutura do Projeto

A estrutura do diretório de testes Cypress está organizada da seguinte forma:

```
cypress/
│
├── e2e/                  # Contém os testes end-to-end (E2E)
│   ├── fixtures/         # Dados simulados usados durante os testes
│   │   ├── cep.json
│   │   └── consultancy.json
│
├── screenshots/          # Capturas de tela automáticas (geradas em falhas de testes, por exemplo)
│
├── support/              # Arquivos auxiliares e funções compartilhadas
│   ├── actions/          # Ações reutilizáveis customizadas
│   │   ├── commands.js
│   │   ├── e2e.js
│   │   ├── PDF_Upload.pdf
│   │   └── utils.js
```

---

## ▶️ Execução da Aplicação

A aplicação **WebDojo** está no mesmo repositório que os testes. Para iniciar a aplicação localmente, execute:

```bash
cd C:\NinjaDoCypress\webdojo\web
npm run dev
```

Este comando utiliza o `serve` para disponibilizar os arquivos da pasta `dist` na porta `3000`. Isso é essencial para que os testes sejam executados contra uma versão estática da aplicação.

---

## ▶️ Execução da API

A aplicação **WebDojo-API** está no repositório de API. Para iniciar a aplicação localmente, execute:

```bash
cd C:\NinjaDoCypress\webdojo\api\
npm run dev
```

---

## ✅ Execução dos Testes Automatizados

Os testes são executados utilizando os scripts definidos no package.json. Os principais comandos disponíveis são:

```json
"dev": "serve -s dist -p 3000",                 // Executa a aplicação localmente
"test": "npx cypress run",                      // Executa todos os testes automatizados
"test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=360,viewportHeight=760",  // Executa o teste de login simulando um dispositivo mobile
"test:login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1440,viewportHeight=900"        // Executa o teste de login em desktop
```

💡 Use os comandos específicos (test:login, test:login:mobile) para testar em diferentes resoluções de tela (responsividade).

#### ✅ Detalhamento dos Testes Automatizados

### 🔹 `test`
```bash
npm run test
```
Executa **todos os testes end-to-end** configurados no diretório `cypress/e2e` com a resolução padrão definida no `cypress.config.js`. Este comando é ideal para rodar a suíte completa em ambiente de CI/CD ou validação geral.

---

### 🔹 `test:login`
```bash
npm run test:login
```
Executa **apenas os testes relacionados ao login** (`login.cy.js`) simulando um **ambiente desktop** com resolução `1440x900`.

**Configuração específica:**
- Viewport: 1440 x 900

Útil para validar o comportamento do login em resoluções comuns de desktops.

---

### 🔹 `test:login:mobile`
```bash
npm run test:login:mobile
```
Executa **os mesmos testes de login** (`login.cy.js`), porém simulando um **dispositivo mobile**, utilizando uma viewport reduzida.

**Configuração específica:**
- Viewport: 360 x 760

Ideal para testes de responsividade e validação da experiência mobile.

---

## 🧪 Observações Importantes

- Os testes Cypress são escritos em JavaScript e utilizam fixtures e comandos customizados para simular ações do usuário.
- O Cypress cria automaticamente capturas de tela e vídeos em caso de falha (caso habilitado).
- Você pode rodar os testes em modo interativo com o comando:

```bash
npx cypress open
```

---

## 📦 Dependências

Certifique-se de instalar todas as dependências com:

```bash
npm install
```