# Sistema de Consulta
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Sobre
Sistema de consulta de dados pessoais como se fosse para polícia civil (nome completo, CPF, RG, endereço, telefone, placa do carro e etc) com foco na aplicação das práticas Scrum para a Disciplina de Introdução a Engenharia de Computação. no Back-End a API Rest foi feita na linguagem Java usando o Framework Spring, o desenvolvimento do front-end foi feito com o framework Angular. Para contextualizar a aplicação do trabalho de IEC

## Como testar

#### Requisitos
- Java 17
- Node.js
- Angular 18
- Banco de Dados PostgreSQL

Clone o repositório

```
git clone https://github.com/Beforg/Sistema-de-Consulta.git
```

Instale as dependencias no front-end
```
npm install
```

Rodar o projeto front-end
```
ng serve
```

Crie um banco de dados chamado **consultas** e rode o back-end. se necessário configure o ``application.properties`` no Spring.

## Funcionalidades

### Sistema de Autenticação 

Login/Registro para utilização do sistema, autenticação atrvés do Token JWT

![](https://github.com/Beforg/assets/blob/main/sdc/1.png)

![](https://github.com/Beforg/assets/blob/main/sdc/2.png)

### Tabela dos clientes registrados no sistema

Exibe todos os clientes registrados no sistema.
![](https://github.com/Beforg/assets/blob/main/sdc/3.png)

### Registrar novos clientes
Área para registrar novos clietes
![](https://github.com/Beforg/assets/blob/main/sdc/4.png)

### Consultas por filtro
Consultas através do CPF. RG ou Placa do Veículo.
![](https://github.com/Beforg/assets/blob/main/sdc/5.png)
