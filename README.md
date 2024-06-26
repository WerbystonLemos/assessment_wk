# Teste de proficiência técnica front-end - Nitronews

## Objetivo

Desenvolver uma mini-aplicação (layout e código) que interaja com um backend rodando em docker através de requisições HTTP.

## Instruções para execução do teste

O candidato deverá desenvolver duas aplicações idênticas:
- A primeira utilizando React (ou outro framework similar)
- A segunda em Javascript ES6 puro (ou Typescript) com um bundler (Webpack, Vite, Rollup, etc) utilizando Babel.

A aplicação em React deverá ser armazenada em uma branch do repositório e a aplicação em Javascript puro deve ser armazenada em uma branch diferente

O layout e design da aplicação fica a critério do candidato (e serão critérios de avaliação), sendo necessário apenas preencher os requisitos descritos abaixo.

A entrega do teste deverá ser feita através de um único repositório git disponível publicamente. O candidato está livre para escolher o provedor que quiser (Gitlab, Github, Bitbucket, etc)

## Requisitos da aplicação

A aplicação deve ser composta por um formulário de cadastro com os campos descritos abaixo e um botão para submeter as informações:
- **Nome**
- **Email**
- **Senha**
- **Confirmação de senha**

O formulário deverá ser validado com as regras descritas no próximo item. O usuário deverá ser notificado sobre os erros de validação do formulário.

Alguns emails estão indisponíveis para cadastro por já estarem cadastrados, o usuário deve ser notificado sobre esses casos também.

## Regras de validação do formulário

A validação deve ser feita também no front-end, seguindo as seguintes regras:
- **Nome:** Obrigatório
- **Email:** Obrigatório; E-mail válido
- **Senha:** Obrigatório; Mínimo de 8 caracteres; Mínimo de 1 caractere minusculo; Mínimo de 1 caractere maiúsculo; Mínimo de um numeral;
- **Confirmação de senha:** Obrigatório; Deve ser idêntico ao campo **Senha**

### Endereços e email indisponíveis
- teste@exemplo.com
- joao@exemplo.com
- maria@acme.net

## Interação com o back-end
Todas as requisições enviadas para o back-end devem ser no formato JSON. Todas as requisições devem possuir um cabeçalho HTTP com nome _x-api-key_ com o seguinte valor: **ECA1AB4CE8583613A2C759B445E98**

Não enviar a requisição em JSON ou com o cabeçalho de autenticação resultará em uma resposta com o código de status 4XX.

Os nomes dos campos no corpo da requisição devem ser os seguintes:
- **Nome:** nome
- **Email:** email
- **Senha:** senha
- **Confirmação de senha:** confirmacaoSenha

Ao enviar a requisição o back-end fará a validação dos campos, caso algum campo não passe na validação receberá um erro 400 com o seguinte corpo:
```json
{
    "erro": true,
    "tipoErro": "CAMPO_INVALIDO",
    "nomeCampo": "<Nome do campo>"
}
```

Ao enviar a requisição o back-end com um email indisponível receberá um erro 400 com o seguinte corpo:
```json
{
    "erro": true,
    "tipoErro": "USUARIO_EXISTENTE"
}
```

## Como executar o servidor do back-end
Para executar o servidor basta executar os seguintes comandos dentro da pasta _backend_
```
docker build --tag 'backend_teste_tecnico' .
```
```
docker run -p 8080:8080 backend_teste_tecnico
```

O servidor estará disponível no endereço ``http://localhost:8080``
