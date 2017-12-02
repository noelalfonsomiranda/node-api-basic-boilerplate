# BASIC NODEJS REST-API BOILERPLATE
> Simple RESTful API Boilerplate

## Setup Guide
- [Getting Started](#installation)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Requirements

1. Node
2. nvm
3. Postgres
4. pgAdmin

#### Required Packages

```
$ npm install -g yarn       # a better module package manager
$ npm install -g standard   # JavaScript Standard Style
$ npm install -g babel-eslint  # required by StandardJs
$ npm install -g snazzy   # Format JavaScript Standard Style as beautiful output
$ npm install -g sequelize-cli  # CLI for Sequelize
$ npm install -g foreman    # Manager for Procfile-based applications
```

#### Addding migration
```
$ sequelize model:create --name Todo --attributes title:string
$ sequelize model:create --name TodoItem --attributes content:string,complete:boolean
```

#### Sequelize CLI's
```
$ sequelize db:migrate             Run pending migrations.
$ sequelize db:migrate:old_schema  Update legacy migration table
$ sequelize db:migrate:undo        Revert the last migration run.
$ sequelize db:migrate:undo:all    Revert all migrations ran.
$ sequelize db:seed                Run seeders.
$ sequelize db:seed:undo           Deletes data from the database.
$ sequelize db:seed:undo:all       Deletes data from the database.
$ sequelize model:create --name modelname --attributes "text:text, url:string" # create model
$ sequelize seed:create     # create seeder
```

#### Overview

- uses Node.js
- written using ES6
- uses Yarn for package dependency management
- uses JavaScript Standard Style
- uses `sequelize` and `sequelize-cli` as ORM and data migration tool
- uses Swagger as documentation, {URL}/docs

#### Installation

```
$ git clone git@github.com:noelalfonsomiranda/node-api-basic-boilerplate.git
$ yarn
$ yarn start
```
*__Note:__ copy .env.sample to .env and configure it.*