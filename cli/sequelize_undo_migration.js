#!/usr/bin/env node
'use strict';

const argv = require('yargs').argv;
const $ = require('draxt');
const { execSync } = require('child_process');


const baseMigration = './src/database';
//we will undo migration only for sps for now since it cause issue with
//model due to references
//https://github.com/sequelize/cli/issues/360
const uriMigration = 'functions'

const migrationPath = `${baseMigration}/${uriMigration}`;
let env =''

//Check if what env we are undoing
if ( argv.env === 'test' ) {
  env = ' --env test ';
} else if ( argv.env === 'staging' ){
  env = ' --env staging ';
} else if ( argv.env === 'uat' ){
  env = ' --env uat ';
} else if ( argv.env === 'production' ){
  env = ' --env production ';
}

(async () => {
  const $app = await $(`${migrationPath}/**`);
  $app
    .forEach(async (node, index, allNodes) => {
      try {
        if (index === 0) return;
        console.log(`...executing ${node.getName()}.js ${env} --migrations-path=${migrationPath}`);
        const result = await execSync(`sequelize db:migrate:undo --name ${node.getName()}.js ${env} --migrations-path=${migrationPath}`)

        console.log(result.toString())
      } catch (error) {
        console.log(`error ${error}`)
        return;
      }
    });
})();
